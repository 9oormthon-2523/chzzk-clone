import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRef } from "react";


/**
 * 호스트가 사용하는 스트리밍 훅
 */


interface ScreenTrackPayload {
    frameRate?:number, 
    bitrateMax?: number, 
    bitrateMin?: number, 
}

type cleanUpTrackType = React.MutableRefObject<AgoraRTCType.ILocalVideoTrack | AgoraRTCType.ILocalAudioTrack | AgoraRTCType.ILocalVideoTrack | null>

//함수 밖에서 사용할 때 필요한 인자 헷갈려서 나중에 사용 예정
type exceptionResorce = "screen" | "mic" ;
type mediaResource = "all" | exceptionResorce;

const useStudioManager = (uid: string) => {
    const channel_ = "demo"
    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || "";
    const clientRef = useRef<AgoraRTCType.IAgoraRTCClient | null>(null);
    const screenTrackRef = useRef<null | AgoraRTCType.ILocalVideoTrack>(null);
    const screenAudioRef = useRef<null | AgoraRTCType.ILocalAudioTrack>(null);
    const micTrackRef = useRef<null | AgoraRTCType.IMicrophoneAudioTrack>(null);

    /** 미디어 **/
    //#region 

    // 트랙 초기화
    const cleanUpTrack = (trackRef: cleanUpTrackType) => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        track.stop();
        track.close();
        trackRef.current = null;
        console.log(`${track} 리소스 초기화 완료`);
    };
        
    // 미디어 공유 해제
    const unpublishMediaTracks = async () => {
        const tracks = [micTrackRef, screenAudioRef, screenTrackRef];
    
        try {
            if (!clientRef.current) return;
            if (!(await clientConnectState())) return;
        
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
    
            // 실패 시 리소스 정리
            for (const trackRef of tracks) {
                if (trackRef.current) cleanUpTrack(trackRef);
            }
    
            console.error(err);
        }
    };

    // 미디어 추출 및 퍼블리시
    const extractMediaTrack = async ( type: mediaResource = 'all', payload?: ScreenTrackPayload) => {
        const { frameRate = 60, bitrateMax = 2500, bitrateMin = 1500 } = payload || {};
        const encoderConfig = { frameRate, bitrateMax, bitrateMin };

        try {
            if (type === "mic" || type === "all") {
                try {
                  const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
                  clientRef.current?.publish(micTrack);
                  micTrackRef.current = micTrack;
                  console.log("마이크 트랙 생성 및 퍼블리시 성공");
                } catch (error) {
                  console.warn("마이크 트랙 생성 실패: 마이크 없이 진행합니다.", error);
                }
            }
      
          // 화면 공유 트랙 생성 및 퍼블리시
            if (type === "screen" || type === "all") {
                try {
                const [screenTrack, screenAudioTrack] = await AgoraRTC.createScreenVideoTrack(
                    { encoderConfig },
                    "enable"
                );
                if (screenTrack && screenAudioTrack) {
                    await clientRef.current?.publish([screenTrack, screenAudioTrack]);
                    screenTrackRef.current = screenTrack;
                    screenAudioRef.current = screenAudioTrack;
                    console.log("화면 공유 트랙 퍼블리시 성공");
                }
                } catch (error) {
                    console.error("화면 공유 트랙 생성 실패", error);
                    throw new Error("화면 공유 트랙 생성 실패: 진행 중단");
                }
             }
        } catch (err: unknown) {
            console.error("미디어 퍼블리싱 실패:", err);
            await unpublishMediaTracks(); // 이미 퍼블리시된 트랙 정리
            throw new Error("미디어 퍼블리싱 실패");
        }
      };

    //#endregion


    /** 클라이언트 **/
    //#region 

    // 클라이언트 생성 및 채널 참가
    const initializeClient = async () => {
        if (!clientRef.current) {
            const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8", role: "host" });
            clientRef.current = client;
            await client.join(APP_ID, channel_, null, uid);
            console.log("클라이언트 초기화 및 채널 참가 완료");
        }
    };

    // 채널 연결 상태일 때만 true
    const clientConnectState = async () => {
        if (!clientRef.current) return false;
        if (clientRef.current.connectionState !== "CONNECTED") return false;
        return true;
    }

    // 클라이언트 해제
    const delClient = async () => {
        try {
            if (clientRef.current) {
                await clientRef.current.leave();
                console.log("채널 종료 완료.");

                clientRef.current = null;
                console.log("클라이언트 해제 완료.");
                return;
            } else {
                console.log("클라이언트가 이미 해제된 상태입니다.");
            }
        } catch (err: unknown) {
            alert('클라이언트를 해제하는 중 오류가 발생했습니다. 새로 고침으로 강제 종료해주세요.')
            throw new Error("클라이언트를 해제하는 중 오류가 발생했습니다.");
        }
    };

    //#endregion


    /** 스트리밍 **/
    //#region 

    //스트리밍 시작
    const streamOn = async () => {
        try {
            //클라이언트 생성
            await initializeClient();

            //트랙 생성
            await extractMediaTrack();            
            return true;
        } catch (err: unknown) {
            console.log("클라이언트 생성 실패",err);
            await delClient();
            await unpublishMediaTracks();
            return false;
        } 
    }

    //스트리밍 종료
    const streamOff = async () => {
        try {     
            await unpublishMediaTracks();
            await delClient();
            return true;
        } catch (err: unknown) {
            console.log(err);
            return false;
        } 
    }

    //스트리밍 중 트랙 리소스 해제
    const stopTrackShare = async () => {
        try {
            await unpublishMediaTracks();    
        } catch (err: unknown) {
            alert('실패! 버튼을 한 번 더 눌러주세요');
            console.log("미디어 트랙 초기화 실패");
        }
    }

    //미디어 트랙 추가 및 변경(변경하고 싶은 트랙 선택)
    const addTrackShare = async (type: mediaResource = "all") => {
        try {
            await unpublishMediaTracks();
            await extractMediaTrack(type);

        } catch (err: unknown) {
            console.error("트랙 추가 중 오류 발생:", err);
            alert("오류로 인해 모든 미디어 공유가 중단되었습니다.");
            
            // 오류 발생 시 모든 트랙 제거
            await unpublishMediaTracks();
            return false;
        }
    };

    //#endregion

    return {
        streamOn,
        streamOff,
        addTrackShare,
        stopTrackShare,    
    }
}

export default useStudioManager;