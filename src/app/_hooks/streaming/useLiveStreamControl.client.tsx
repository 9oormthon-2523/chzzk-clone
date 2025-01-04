import { useLayoutEffect, useRef, useState } from "react";
import { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type * as AgoraRTCType from "agora-rtc-sdk-ng";
import useAgoraClient from "./useAgoraClient.client";
import useAgoraMedia from "./useAgoraMedia.client";
import { useRouter } from 'next/router';
import { IRemoteAudioTrack } from "agora-rtc-sdk-ng/esm";

/**
 * 시청자들이 보는 live 페이지 훅
 */

interface useStreamforStudioPayload {
    uid:string
    channel:string
    streaming_is_active:boolean
    videoRef:React.RefObject<HTMLVideoElement | null>
    audioRef:React.RefObject<HTMLAudioElement | null>
}

type mediaType = "audio" | "video" | "datachannel";

const useLiveStreamControl = (payload: useStreamforStudioPayload) => {
    const { 
        uid, 
        channel, 
        videoRef, 
        audioRef,
        streaming_is_active,
    } = payload;

    const { 
        getClient, 
        resetClient,
        joinChannel,
        publishMediaTracks,
        clientState,
        getHostMediaResource,
        deleteHostMediaResource,
    } = useAgoraClient();

    const [ratio, setRatio] = useState<[number, number]>([1980, 1080]);
    const videoSourceRef = useRef<IRemoteVideoTrack | null>(null);
    const audieSourceRef = useRef<IRemoteAudioTrack | null>(null);

    //퍼블리싱 감지하면 해당 미디어를 가져와서 연결
    const getVideoAudioResource = async () => {
        //퍼블리쉬 되면 가져옴 
        const {videoTrack, audioTrack} = await getHostMediaResource();

        if (videoTrack) {
            videoSourceRef.current = videoTrack;
            
            //비디오가 바뀌면 w,h 추출
            videoTrack.on('video-state-changed', () => {
                const stats = videoTrack.getStats();
                const w = stats.receiveResolutionWidth;
                const h = stats.receiveResolutionHeight;
                setRatio([w, h]);
            });

            if (videoTrack && videoRef.current) {
                try {
                    videoTrack.play(videoRef.current);
                    console.log('Video is playing');
                } catch (err) {
                    console.error('Error playing video:', err);
                }
            }
        }
    };

    //해당 미디어를 연결 중지 뒤 초기화
    const deleteVideoAudioResource = async (media: mediaType) => {
        try {
            if (media === "video" && videoSourceRef.current) {
                videoSourceRef.current.stop();  
                videoSourceRef.current = null;  
                console.log("비디오 리소스가 삭제되었습니다.");
            }
    
            if (media === "audio" && audieSourceRef.current) {
                audieSourceRef.current.stop();  
                audieSourceRef.current = null;  
                console.log("오디오 리소스가 삭제되었습니다.");
            }
        } catch (error) {
            console.error("미디어 리소스를 삭제하는 중 오류가 발생했습니다.", error);
            //페이지 새로고침으로 해야하나 고민 중
        }
    };
    
    

    //즉시 레이아웃을 반영하고 싶어서 useLayoutEffect사용
    useLayoutEffect(()=>{
        (async ()=> {
            try {
                //스트리밍 방이 켜지면 클라이언트 생성
                if (!streaming_is_active) return;
                await getClient("audience");
                console.log('클라이언트 생성완료');

                await joinChannel({CHANNEL:channel,TOKEN:null});
                console.log('채널 참가');

                await getVideoAudioResource();
                console.log('publish 미디어 소켓 연결');

                await deleteHostMediaResource(deleteVideoAudioResource);
                console.log('unpublicsh 미디어 소켓 연결');


            } catch (err:unknown) {
                console.log("클라이언트를 찾지 못하였습니다.",err);
                //클라이언트나 join에 오류가 있을 경우 페이지 새로고침
            }
        })();
    },[streaming_is_active]);

   

    return {
        ratio,
    }
}

export default useLiveStreamControl;