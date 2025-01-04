import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import AgoraRTC from 'agora-rtc-sdk-ng';

import { useRef } from "react";
AgoraRTC.setLogLevel(1); // 오류만 출력

interface ScreenTrackPayload {
    frameRate?:number, 
    bitrateMax?: number, 
    bitrateMin?: number, 
  }

const useAgoraMedia = () => {
    const tracksRef = useRef<AgoraRTCType.ILocalTrack[]>([]);

    const resetTracks = async () => {
        if(!tracksRef.current) {
            console.log('트랙이 존재하지 않습니다.');
            return;
        }

        try {
            for (const track of tracksRef.current) {
                await track.stop(); 
                await track.close(); 
            }

            tracksRef.current = [];
            console.log("트랙이 성공적으로 초기화되었습니다.");
        } catch (err: unknown) {
            console.error("트랙 초기화 중 오류 발생:", err);
        }
    }

    const saveTracks = (tracks: AgoraRTCType.ILocalTrack[]) => {
        tracksRef.current = tracks; 
        console.log("트랙이 성공적으로 저장되었습니다:", tracksRef.current);
    };

    //오디오 트랙
    const getAudioTrack = () => AgoraRTC.createMicrophoneAudioTrack();

    //스크린 트랙만
    const getScreenTrack = async (payload:ScreenTrackPayload) => {
        const { frameRate = 60, bitrateMax = 2500, bitrateMin = 1500 } = payload;
        return await AgoraRTC.createScreenVideoTrack(
            { 
                encoderConfig: {
                    frameRate, 
                    bitrateMax, 
                    bitrateMin,
                }
            }, "disable"
        ) as AgoraRTCType.ILocalVideoTrack
    };

    //스크린 트랙, 스크린 오디오 트랙
    const getScreenAudioTracks = async (payload: ScreenTrackPayload) => {
        const { frameRate = 60, bitrateMax = 2500, bitrateMin = 1500 } = payload;
    
        try {
            const tracks = await AgoraRTC.createScreenVideoTrack(
                {
                    encoderConfig: {
                        frameRate,
                        bitrateMax,
                        bitrateMin,
                    },
                },
                "enable"
            );
        
            return [tracks[0], tracks[1]];
        } catch (err:unknown) {
            console.error("권한 요청 실패:", err);
        
            // 사용자 안내 메시지 추가
            alert("화면 공유 권한이 거부되었습니다. 권한을 허용하고 다시 시도해주세요.");
        
            // 추가 오류 처리 로직
            return [];
        }
        
    };

    //카메라 트랙
    const getVideoTrack = async () => {(
        await AgoraRTC.createCameraVideoTrack(
            { 
            encoderConfig: {
                frameRate:120, 
                bitrateMax: 2500, 
                bitrateMin: 1500 
            }
            }
        ) as AgoraRTCType.ILocalVideoTrack
    )};

    const closeScreenTrack = (screenTrack: AgoraRTCType.ILocalTrack, fn: () => Promise<void>) => {
        screenTrack.on("track-ended", async () => {
            try {
                await fn();
            } catch (error) {
                console.error("스크린 트랙 종료 중 오류 발생:", error);
            }
        });
    };

    return {
        saveTracks,
        resetTracks,
        getAudioTrack,
        getScreenTrack,
        getScreenAudioTracks,
        getVideoTrack,
        closeScreenTrack,
    }
}

export default useAgoraMedia;