import AgoraRTC, { IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { RefObject, useEffect, useRef, useState } from "react";
import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import useAudioUnlock from "./useAudioUnlock";

/**
 * 시청자들이 보는 live 페이지 훅
 */

interface useStreamforStudioPayload {
    uid?:string
    channel:string
    streaming_is_active:boolean //스트리밍이 true인지 false인지
    videoRef:RefObject<HTMLVideoElement | null> //실제 비디오 연결된 ref
}

const useLiveManager = (payload: useStreamforStudioPayload) => {
    
    const {
        channel,
        videoRef,
    } = payload;

    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || "";
    const clientRef = useRef<AgoraRTCType.IAgoraRTCClient | null>(null);
    const screenTrackRef = useRef<null | IRemoteVideoTrack>(null); // 스크린 비디오 리소스
    const audioTrackRefs = useRef<Array<null | IRemoteAudioTrack>>([]); // 오디오 리소스
    const audioElRefs = useRef<Array<HTMLAudioElement>>([]); // 오디오 요소
    const [ratio, setRatio] = useState<[number, number]>([1.83, 0.55]); //리사이즈 너비
    const { audioLimit } = useAudioUnlock({audioElRefs}); // 오디오 정책 해제 훅

    /** 소켓 **/
    //#region 

    // 미디어 퍼블리싱
    const clinetPublish = () => {
        if (!clientRef.current) return;
        const client = clientRef.current;

        client.on("user-published", async (user, mediaType) => {
            try {
                if (await client.connectionState === "CONNECTED") {
                    await client.subscribe(user, mediaType);
                    
                    if (mediaType === "video") {
                        const remoteScreenTrack = await user.videoTrack;
                        
                        if (remoteScreenTrack && videoRef.current) {
                            screenTrackRef.current = remoteScreenTrack;
                            remoteScreenTrack.play(videoRef.current);     

                            //비율
                            await remoteScreenTrack.on('video-state-changed', () => {
                                const stats = remoteScreenTrack.getStats();
                                const w = stats.receiveResolutionWidth;
                                const h = stats.receiveResolutionHeight;
                                console.clear();
                                console.log(w,h);
                                setRatio([w/h, h/w]);
                            })

        
                        }
                        
                    }

                    if (mediaType === 'audio') {
                        const remoteAudioTrack = user.audioTrack;
                        if (remoteAudioTrack) {
                            addAudioTrack(remoteAudioTrack);
                        } 
                    }  
                }
            } catch (error) {
                console.error("미디어 구독 오류", error);
            }
        });
    }


    // 미디어 언퍼블리싱
    const clinetUnpublish = () => {
        if (!clientRef.current) return;
        const client = clientRef.current;

        client.on("user-published", async (user, mediaType) => {
            try {
                await client.on("user-unpublished", async (user, mediaType) => {
                    try {
                        await delAllTrack();
                        console.log('미디어 리소스 초기화');
                    } catch (error) {
                        console.log("미디어 리소스 초기화를 하지 못했습니다.");
                    }
                });
            } catch (error) {
                await delAllTrack();
                console.error("미디어 구독 오류", error);
            }
        });
    }


    //#endregion

    /** 리소스 **/
    //#region 

    //오디오 트랙 추가
    const addAudioTrack = (track: IRemoteAudioTrack) => {
        const idx = audioTrackRefs.current.length;
        if (idx >= 2) return;

        track.setVolume(100);
        const audioEl = document.createElement("audio");

        audioEl.srcObject = new MediaStream([track.getMediaStreamTrack()]);
        audioEl.volume = 1;
        if (audioLimit) {
            audioEl.play();
        } else {
            audioEl.muted = true;
        }
        document.body.appendChild(audioEl);
        audioElRefs.current.push(audioEl);
        audioTrackRefs.current.push(track);
        
        console.log(`오디오 트랙 추가 완료: Index ${idx}`);
    };

    // 리소스 정리
    const delAllTrack = () => {
        // 비디오 리소스 정리
        if (screenTrackRef.current) {
            screenTrackRef.current.stop(); 
            screenTrackRef.current = null; 
            if (videoRef.current) videoRef.current.srcObject = null; 
        }

        // 오디오 리소스 정리
        audioTrackRefs.current.forEach((audioTrack, idx) => {
            if (audioTrack) {
                audioTrack.stop(); 
                audioTrackRefs.current[idx] = null;
            }

            if (audioElRefs.current[idx]) {
                const audioEl = audioElRefs.current[idx];
                const mediaStream = audioEl.srcObject as MediaStream;
                mediaStream.getTracks().forEach((track) => track.stop());
                audioEl.srcObject = null;
            }
        });
    }

    //#endregion 

    useEffect(() => {
        const initClient = async () => {
            if (clientRef.current) {
                console.log("이미 클라이언트가 존재합니다.");
                return;
            }
    
            try {
                //클라 생성
                const client = await AgoraRTC.createClient({ mode: "rtc", codec: "vp8", role:"audience" });
                clientRef.current = client;
                console.log("클라이언트 생성 완료.");

                await client.join(APP_ID, channel, null);
                console.log("호스트 채널 참가 완료.");
    
                await clinetPublish();
                await clinetUnpublish();

            } catch (error) {
                console.error("클라 생성 오류", error);
            }
        };
    
        initClient();
    
        return () => {
            if (!clientRef.current) return;
            clientRef.current.leave().then(() => {
                clientRef.current = null;
            });
        };
    }, []);    

    return {
        ratio,
    }
}

export default useLiveManager;