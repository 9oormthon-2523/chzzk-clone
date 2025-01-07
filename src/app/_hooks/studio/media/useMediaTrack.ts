import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { RefObject } from "react";

type micResource = "screen" | "mic" ;
type mediaResource = "all" | micResource;

export interface ScreenTrackType {
    frameRate?:number
    bitrateMax?: number
    bitrateMin?: number
}

interface delMediaTrackPayload {
    clientRef: RefObject<null|AgoraRTCType.IAgoraRTCClient>
    micTrackRef: RefObject<null | AgoraRTCType.IMicrophoneAudioTrack>
    screenTrackRef: RefObject<null | AgoraRTCType.ILocalVideoTrack>
    screenAudioRef: RefObject<null | AgoraRTCType.ILocalAudioTrack>
}

interface ScreenTrackPayload extends delMediaTrackPayload{
    type: mediaResource
    screenType?: ScreenTrackType
    audioVolume:{screen: number, mic: number}
}


type trackType = RefObject<null | AgoraRTCType.IMicrophoneAudioTrack | AgoraRTCType.ILocalVideoTrack | AgoraRTCType.ILocalAudioTrack>

export const extractMediaTrack = async (payload: ScreenTrackPayload) => {
    const {
      type,
      clientRef,
      micTrackRef,
      screenAudioRef,
      screenTrackRef,
      screenType,
      audioVolume,
    } = payload;
  
    // 클라이언트가 없거나, 연결된 상태가 아니면 return
    if (!clientRef.current || clientRef.current.connectionState !== "CONNECTED") return;
  
    const { frameRate = 60, bitrateMax = 2500, bitrateMin = 1500 } = screenType || {};
    const encoderConfig = { frameRate, bitrateMax, bitrateMin };

    // 미리 초기화
    await unpublishMediaTracks({clientRef,micTrackRef,screenAudioRef,screenTrackRef});
  
    try {
      // 마이크 공유
      if (type === "mic" || type === "all") {
        const devices = await AgoraRTC.getDevices();
        const hasMicrophone = devices.some(device => device.kind === "audioinput");
  
        if (!hasMicrophone) {
          console.log("사용 가능한 마이크가 없습니다. 마이크 없이 진행합니다.");
          micTrackRef.current = null;
        } else {
          // 트랙 추출 및 퍼블리시
          const micTrack = await AgoraRTC.createMicrophoneAudioTrack({ AGC: true, ANS: true });
          await clientRef.current.publish(micTrack);
          micTrack.setVolume(audioVolume.mic);
          micTrackRef.current = micTrack;
          console.log("마이크 트랙 생성 및 퍼블리시 성공");
        }
      }
  
      // 화면 공유 트랙 생성 및 공유
      if (type === "screen" || type === "all") {
  
        // 트랙 추출
        const screenTracks = await AgoraRTC.createScreenVideoTrack(
          { encoderConfig: encoderConfig },
          "auto"
        );
  
        if (Array.isArray(screenTracks)) {
          // 스크린 화면 및 오디오 트랙 퍼블리시
          await clientRef.current.publish(screenTracks);
          screenTracks[1].setVolume(audioVolume.screen);
          screenTrackRef.current = screenTracks[0];
          screenAudioRef.current = screenTracks[1];
          console.log("스크린 화면, 스크린 오디오 공유 성공");
        } else {
          // 스크린 화면만 퍼블리시
          await clientRef.current.publish(screenTracks);
          screenTrackRef.current = screenTracks;
          console.log("스크린 화면 공유 성공");
        }
      }
    } catch (error) {
      console.error("미디어 퍼블리싱 실패:", error);
      await unpublishMediaTracks({clientRef,micTrackRef,screenAudioRef,screenTrackRef});
      throw new Error("미디어 퍼블리싱 실패");
    }
  };

const cleanUpTrack = (trackRef: trackType) => {
  if (!trackRef.current) return;

  const track = trackRef.current;
  track.stop();
  track.close();
  trackRef.current = null;
  console.log(`${track} ${trackRef.current} 리소스 초기화 완료`);
};
  
// 미디어 공유 해제
export const unpublishMediaTracks = async (payload:delMediaTrackPayload) => {
    const { clientRef, micTrackRef, screenAudioRef, screenTrackRef } = payload;
    const tracks = [micTrackRef, screenAudioRef, screenTrackRef];

    try {
        if (!clientRef.current) return;
        if (clientRef.current.connectionState !== "CONNECTED") return;
    
        // 트랙 언퍼블리시 및 정리
        for (const trackRef of tracks) {
            if (trackRef.current) {
                await clientRef.current.unpublish(trackRef.current);
                cleanUpTrack(trackRef);
            }
        }
        console.log("모든 미디어 트랙 언퍼블리시 및 초기화 완료");

    } catch (err: unknown) {
        console.error("언퍼블리싱 실패. 모든 리소스를 초기화합니다.");

        // 실패 시 전체 리소스 정리
        for (const trackRef of tracks) {
            if (trackRef.current) cleanUpTrack(trackRef);
        }

        throw new Error("미디어 언퍼블리싱 실패 임의로 미디어 리소스를 정리합니다.");
    }
};