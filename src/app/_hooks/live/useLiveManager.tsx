import AgoraRTC, { IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { RefObject, useEffect, useRef, useState } from "react";
import useVideoControl from "@/app/_store/live/useVideoControl"
import type * as AgoraRTCType from "agora-rtc-sdk-ng";


/**
 * 시청자들이 보는 live 페이지 훅
 */

interface useStreamforStudioPayload {
    channel:string
    streaming_is_active:boolean //스트리밍이 true인지 false인지
    screenElRef:RefObject<HTMLVideoElement | null> //실제 비디오 연결된 ref
    audioElRef:RefObject<HTMLAudioElement|null>
}

type mediaType = "audio" | "video" | "datachannel"

interface publishPayload {
    user:AgoraRTCType.IAgoraRTCRemoteUser
    mediaType:mediaType
}

const useLiveManager = (payload: useStreamforStudioPayload) => {
    const {
        channel,
        audioElRef,
        screenElRef,
        streaming_is_active, // 스트리밍_룸_상태
    } = payload;

    const hostUIDRef = useRef<string | null>(null); // 호스트 미들웨어 uid
    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || ""; //키
    const audioTrackRef = useRef<null | IRemoteAudioTrack>(null); // 오디오 트랙
    const screenTrackRef = useRef<null | IRemoteVideoTrack>(null); // 스크린 트랙
    const clientRef = useRef<AgoraRTCType.IAgoraRTCClient | null>(null); // 클라이언트
    const [ratio, setRatio] = useState<[number, number]>([1.83, 0.55]); 

    // 볼륨 조절
    const audiolimit = useRef<boolean>(false);
    const audioMute = useVideoControl(state => state.audioMute);
    const isMuted = useVideoControl(state => state.audioTrack.isMuted);
    const videoState = useVideoControl(state => state.videoTrack.isEnabled);
    const volumeLevel = useVideoControl(state => state.audioTrack.volumeLevel);

    /** 미디어 공유 **/
    //#region 

    const mediaPublished = async (payload:publishPayload, client: AgoraRTCType.IAgoraRTCClient) => {
        const { user, mediaType } = payload;

        if (await client.connectionState !== "CONNECTED") return;

        await client.subscribe(user, mediaType);
        hostUIDRef.current = user.uid.toString();

        if (mediaType === "video") {
            const remoteScreenTrack = await user.videoTrack;
            
            if (remoteScreenTrack && screenElRef.current) {
                screenTrackRef.current = remoteScreenTrack;
                screenElRef.current.muted = true;
                remoteScreenTrack.play(screenElRef.current);     
                screenElRef.current.play();
                screenElRef.current.style.objectFit = "contain"
                //비율
                await remoteScreenTrack.on('video-state-changed', () => {
                    const stats = remoteScreenTrack.getStats();
                    const w = stats.receiveResolutionWidth;
                    const h = stats.receiveResolutionHeight;
                    if(w !== 0 || h !== 0)
                        setRatio([w/h, h/w]);
                })
            }
        }

        if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            if (remoteAudioTrack) {
                if(!audioElRef.current) return;
                    remoteAudioTrack.setVolume(volumeLevel);
                    audioElRef.current.srcObject = new MediaStream([remoteAudioTrack.getMediaStreamTrack()]);
                    audioTrackRef.current = remoteAudioTrack;
                    audioElRef.current.volume = 0.01 * volumeLevel;
                    audioElRef.current.muted = true;
                    if(audiolimit.current) {
                        audioTrackRef.current.play();
                    } else {
                        audioMute(true);
                    }                   
            } 
        }  
    }

    const mediaUnpublished = async (payload: publishPayload) => {
        const { mediaType } = payload;

        const hasMediaTracks =
            screenTrackRef.current || audioTrackRef.current
    
        if (!hasMediaTracks) return;

        if (mediaType === "audio") await cleanAudioTrack();

        else if(mediaType === "video") await cleanVideoTrack();

    };
    //#endregion


    /** CLEAN UP **/
    //#region 

    const cleanVideoTrack = async () => {

        if (screenTrackRef.current && screenElRef.current) {
            const mediaStream = screenElRef.current.srcObject as MediaStream;
            if(mediaStream) {
                const tracks = mediaStream.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
            }

            screenTrackRef.current.stop();
            screenElRef.current.pause();   
            screenElRef.current.srcObject = null;
            screenTrackRef.current = null;
            console.log("비디오 트랙 정리 완료");
        }
    };
    
    const cleanAudioTrack = async () => {

        if (audioTrackRef.current && audioElRef.current) {
            const mediaStream = audioElRef.current.srcObject as MediaStream;
            if(mediaStream) {
                const tracks = mediaStream.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
            }
            
            await audioElRef.current.pause();
            await audioTrackRef.current.stop();
            audioTrackRef.current = null;
            audioElRef.current.srcObject = null; 

            console.log("오디오 트랙 정리 완료");
        }
    };
    
    // 클라이언트 초기화
    const clearAll = async () => {
        if(clientRef.current && clientRef.current.connectionState === "CONNECTED") {
            clientRef.current.leave().then(async() => {

                console.log("Left channel");
                if(!clientRef.current) return;
                await clientRef.current.removeAllListeners(); 
                if (screenTrackRef.current && screenElRef.current) {
                    const mediaStream = screenElRef.current.srcObject as MediaStream;
                    if(mediaStream) {
                        const tracks = mediaStream.getTracks();
                        tracks.forEach((track) => {
                            track.stop();
                        });
                    }

                    screenTrackRef.current.stop();
                    screenElRef.current.pause();   

                    screenElRef.current.srcObject = null;
                    screenTrackRef.current = null;
                }
          
                if (audioTrackRef.current && audioElRef.current) {
                    const mediaStream = audioElRef.current.srcObject as MediaStream;
                    if(mediaStream) {
                        const tracks = mediaStream.getTracks();
                        tracks.forEach((track) => {
                            track.stop();
                        });
                    }
                    
                    await audioElRef.current.pause();
                    await audioTrackRef.current.stop();
                    audioTrackRef.current = null;
                    audioElRef.current.srcObject = null; 
                }
                clientRef.current = null;
            });
        } 
    }
    //#endregion 


    /** useffect **/
    //#region 

    // 오디오 초기값 세팅 mute + 화면이 꺼질때 실행할 함수;
    useEffect(()=>{
        audioMute(true);

    
    },[]);

    // 스트리밍
    useEffect(() => {
        const initClient = async () => {
            if (clientRef.current) {
                console.log("이미 클라이언트가 존재합니다.");
                return;
            }

            clientRef.current = await AgoraRTC.createClient({ mode: "live", codec: "vp8", role:"audience" });
            const client = await clientRef.current;

            try {       
                await client.join(APP_ID, channel, null);
                clientRef.current = client;
                console.log("호스트 채널 참가 완료.");
     
                // 미디어 공유 시작
                await client.on('user-published', async(user, mediaType) => {
                    try {
                        mediaPublished({user, mediaType}, client);
                    } catch {
                        await client.unsubscribe(user, mediaType);
                        
                        if (mediaType === "audio") await cleanAudioTrack();

                        else if(mediaType === "video") await cleanVideoTrack();
                    }
                });


                // 미디어 공유 종료
                await client.on('user-unpublished', async(user, mediaType) =>{
                    if(client.connectionState !== "CONNECTED") return;
                    try {
                        await client.unsubscribe(user, mediaType);
                        await mediaUnpublished({user, mediaType});
                    } catch {
                        await client.unsubscribe(user, mediaType);
                        
                        if (mediaType === "audio") await cleanAudioTrack();

                        else if(mediaType === "video") await cleanVideoTrack();
                    }
                });


                // 호스트가 채널 나감
                await client.on('user-left', async (user) => {
                    if(!hostUIDRef.current) return;
                    if(hostUIDRef.current === user.uid.toString()){
                        clearAll();
                    }    
                });

            } catch (error) {
                console.error("클라이언트 생성 오류", error);
                clearAll();    
            }
        };
        
        
        if (streaming_is_active) {
            initClient();
        } else {
            clearAll();     
        }
        
        return () => {
            if(!clientRef.current) return;
            clientRef.current.leave().then(async () => {
                clearAll(); 
                
            });
        };
    }, [streaming_is_active]);   

    // 볼륨 비디오 조절
    useEffect(() => {
        if (!clientRef.current) return;
        if (!audioElRef.current || !audioTrackRef.current) return;
        if (!screenElRef.current) return;

        // 비디오 정지
        if (!videoState) {
            audioTrackRef.current.stop();
            if(screenTrackRef.current) screenTrackRef.current.stop();
        } 

        // 비디오 플레이
        else {
            if(screenTrackRef.current) screenTrackRef.current.play(screenElRef.current);

            // Mute = true
            if (isMuted) {
                audioTrackRef.current?.stop();
            }

            // Mute = false
            else {
                if(!audiolimit.current) {
                    audiolimit.current = true;
                    audioTrackRef.current.play();
                }
                else {
                    if (audioTrackRef.current.isPlaying === false) {
                        audioTrackRef.current.play();
                    }
                    audioTrackRef.current.setVolume(volumeLevel);
                }
            }
        } 
    }, [isMuted, videoState, volumeLevel]);


    //#endregion

    return {
        ratio,
    }
}

export default useLiveManager;