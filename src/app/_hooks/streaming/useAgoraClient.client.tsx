import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useRef } from "react"

interface joinChannelPayload {
    CHANNEL:string
    TOKEN:string | null
    uid?:string
}

interface getHostMediaResourcePayload {
    videoTrack: AgoraRTCType.IRemoteVideoTrack | undefined
    audioTrack: AgoraRTCType.IRemoteAudioTrack | undefined
}

const useAgoraClient = () => {
    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || "";

    //클라이언트
    const clientRef = useRef<null | AgoraRTCType.IAgoraRTCClient>(null);

    // 클라이언트 초기화
    const resetClient = async () => {
        if (!clientRef.current) {
            console.log("클라이언트가 존재하지 않습니다.");
            return;
        }

        try {
            // 클라이언트가 서버와 연결되어 있을 때만 해제
            if (clientRef.current.connectionState === "CONNECTED") {
                await clientRef.current.leave();
                console.log("클라이언트가 채널에서 나갔습니다.");
            } else {
                console.log("클라이언트가 서버와 연결이 끊어졌습니다.");
            }
        } catch (error) {
            console.error("클라이언트 리셋 중 오류 발생:", error);
            throw new Error("클라이언트 리셋이 제대로 되지 않았습니다.");
        } finally {
            clientRef.current = null;
            console.log("클라이언트가 초기화되었습니다.");
        }
    };

    //클라이언트 생성
    const getClient = async (role:"host"|"audience") => clientRef.current = await AgoraRTC.createClient({ mode: "rtc", codec: "vp8", role });

    //채널 참가
    const joinChannel = async (payload: joinChannelPayload) => {
        if (!clientRef.current) {
            console.log("클라이언트가 존재하지 않습니다.");
            return;
        }
    
        const { CHANNEL, TOKEN, uid } = payload;
    
        try {
            await clientRef.current.join(APP_ID, CHANNEL, TOKEN, uid);
            console.log("채널에 성공적으로 참가했습니다.");
        } catch (error) {
            console.error("채널 참가 중 오류 발생:", error);
            throw new Error("채널에 참가할 수 없습니다. 정보를 확인 후 다시 시도해주세요.");
        }
    };

    //미디어 트랙 공유
    const publishMediaTracks = async (tracks: AgoraRTCType.ILocalTrack[]) => {
        if (!clientRef.current) {
            console.log("클라이언트가 존재하지 않습니다.");
            return;
        }
    
        if (!tracks || tracks.length === 0) {
            console.log("공유할 미디어 트랙이 없습니다.");
            return;
        }
    
        try {
            await clientRef.current.publish(tracks);
            console.log("미디어 트랙 공유 완료", tracks);
        } catch (error: unknown) {
            console.error("미디어 트랙 공유 중 오류 발생:", error);
            throw new Error("미디어 트랙 공유가 실패했습니다. 연결 상태를 확인하고 다시 시도해주세요.");
        }
    };

    const clientState = ():"null"| AgoraRTCType.ConnectionState => {
        const client = clientRef.current;
        if(!client) return "null"
        
        return client.connectionState;
    }

    const getHostMediaResource = async (): Promise<getHostMediaResourcePayload> => {
        const failValue = { videoTrack: undefined, audioTrack: undefined };
        if (clientState() !== "CONNECTED") return failValue;
    
        return new Promise((resolve, reject) => {
            if(!clientRef.current) return failValue;
            clientRef.current.on("user-published", async (user, mediaType) => {
                if (clientRef.current) {
                    try {
                        // 미디어 구독
                        await clientRef.current.subscribe(user, mediaType);
    
                        let videoTrack: AgoraRTCType.IRemoteVideoTrack | undefined;
                        let audioTrack: AgoraRTCType.IRemoteAudioTrack | undefined;
    
                        // 미디어 타입에 따른 트랙 할당
                        if (mediaType === 'video') {
                            videoTrack  = user.videoTrack;
                        }
                        if (mediaType === 'audio') {
                            audioTrack = user.audioTrack;
                        }
                        
                        // 트랙 정보를 resolve하여 반환
                        resolve({ videoTrack, audioTrack });
                    } catch (error) {
                        console.error("Error subscribing to media:", error);
                        reject(failValue);  // 에러 발생 시 null 반환
                    }
                }
            });
        });
    };

    return {
        getClient,
        resetClient,
        joinChannel,
        publishMediaTracks,
        clientState,
        getHostMediaResource,
    }
}


export default useAgoraClient;