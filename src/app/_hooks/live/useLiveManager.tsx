import AgoraRTC, { IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { RefObject, useEffect, useRef, useState } from "react";
import useVideoControl from "@/app/_store/live/useVideoControl"
import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import useAudioUnlock from "./useAudioUnlock";

/**
 * 시청자들이 보는 live 페이지 훅
 */

interface useStreamforStudioPayload {
    host_id?:string
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
        host_id,
        channel,
        audioElRef,
        screenElRef,
        streaming_is_active, // 스트리밍_룸_상태
    } = payload;

    const limitRef = useRef<boolean>(false); // 오디오 정책 우회 
    const hostUIDRef = useRef<string | null>(null); // 호스트 미들웨어 uid
    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || ""; //키
    const audioTrackRef = useRef<null | IRemoteAudioTrack>(null); // 오디오 트랙
    const screenTrackRef = useRef<null | IRemoteVideoTrack>(null); // 스크린 트랙
    const clientRef = useRef<AgoraRTCType.IAgoraRTCClient | null>(null); // 클라이언트
    const [ratio, setRatio] = useState<[number, number]>([1.83, 0.55]); 
    const { audioTrack, videoTrack, audioMute } = useVideoControl(); // 오디오 조절
    const { limitState } = useAudioUnlock(audioElRef, limitRef, audioTrack.isMuted); // 오디오 정책 해제 훅
    const { isMuted, volumeLevel } = audioTrack;

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
                    remoteAudioTrack.setVolume(audioTrack.volumeLevel);
                    audioElRef.current.srcObject = new MediaStream([remoteAudioTrack.getMediaStreamTrack()]);
                    audioTrackRef.current = remoteAudioTrack;

                    if (limitRef.current) {
                        audioElRef.current.volume = 0.01 * audioTrack.volumeLevel;
                        audioElRef.current.muted = false;
                        audioElRef.current.play();
                    } else {
                        audioElRef.current.muted = true;
                    }                     
            } 
        }  
    }

    const mediaUnpublished = async (payload: publishPayload) => {
        const { user, mediaType } = payload;

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
        const screenEl = screenElRef.current;
        const screenTrack = screenTrackRef.current;

        if (screenTrack) {
            await screenTrack.stop();
            await screenTrack.removeAllListeners();
        }

        if (screenEl) {
            screenEl.pause();
            screenEl.srcObject = null;
            screenEl.src = "";
        }

        screenTrackRef.current = null;
        console.log("비디오 트랙 정리 완료");
    };
    
    const cleanAudioTrack = async () => {
        const audioEl = audioElRef.current;
        const audioTrack = audioTrackRef.current;

        if (audioTrack) {
            await audioTrack.stop();
            await audioTrack.removeAllListeners();
            audioTrackRef.current = null;
        }

        if (audioEl) {
            const mediaStream = audioEl.srcObject as MediaStream | null;
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            audioEl.srcObject = null;
        }
        console.log("오디오 트랙 정리 완료");
    };
    
    // 클라이언트 초기화
    const clearAll = async () => {
        const client = clientRef.current;
        if (!client) return;
        await cleanAudioTrack();
        await cleanVideoTrack();
        await client.removeAllListeners();
        await client.leave();
        clientRef.current = null;
    }
    //#endregion 


    /** useffect **/
    //#region 

    // 오디오 초기값 세팅 mute;
    useEffect(()=>{
        audioMute(true);
    },[]);

    // 브라우저 정책 우회
    useEffect(()=>{
        limitRef.current = limitState;
    },[limitState]);

    // 스트리밍
    useEffect(() => {
        const initClient = async () => {
            const client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role:"audience" });

            if (clientRef.current) {
                console.log("이미 클라이언트가 존재합니다.");
                return;
            }
    
            try {                     
                await client.join(APP_ID, channel, null);
                clientRef.current = client;
                console.log("호스트 채널 참가 완료.");
     
                // 미디어 공유 시작
                await client.on('user-published', async(user, mediaType) => {
                    try {
                        mediaPublished({user, mediaType}, client);
                    } catch (err:unknown) {
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
                    } catch (err:unknown) {
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
        
        return () => {clearAll();}
    }, [streaming_is_active]);   
    
    // 볼륨
    useEffect(()=>{
        if (!audioElRef.current) return;

        if (isMuted) {
            audioElRef.current.muted = true;
            return;

        } else {
            if (!limitRef.current) return;

            if (audioElRef.current.muted) 
                audioTrackRef.current?.play();

            audioElRef.current.volume = volumeLevel * 0.01;

        }
    },[audioTrack.volumeLevel, isMuted]);

    // 비디오
    useEffect(() => {
        const screen = screenElRef.current;
        const screenTrack = screenTrackRef.current;

        if (!screen || !screenTrack) return; 
    
        if (videoTrack.isEnabled) {
            screenTrackRef.current?.play(screen);
            if (limitRef.current) 
                audioTrackRef.current?.play();

        } else {
            screenTrackRef.current?.stop();
            audioElRef.current?.pause();
            audioTrackRef.current?.stop();
        }
    }, [videoTrack.isEnabled]); 

    //#endregion

    return {
        ratio,
    }
}

export default useLiveManager;