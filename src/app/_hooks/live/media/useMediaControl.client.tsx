import { IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import useLiveControl from "@/app/_store/stores/live/useLiveControl";
import { RefObject, useEffect } from "react";


interface useMeidaControl_payload {
    audiolimit:RefObject<boolean>
    videoElRef: RefObject<HTMLVideoElement | null>
    canvasElRef: RefObject<HTMLCanvasElement | null>
    audioTrackRef: RefObject<IRemoteAudioTrack | null>
    videoTrackRef: RefObject<IRemoteVideoTrack | null>
}

const useMediaControl = (payload:useMeidaControl_payload) => {
    const {
        audiolimit,
        videoElRef,
        canvasElRef,
        audioTrackRef,
        videoTrackRef,
    } = payload;
    
    // Volume Control
    const audioMute = useLiveControl(state => state.audioTrack.actions.audioMute);
    const isMuted = useLiveControl(state => state.audioTrack.state.isMuted);
    const videoState = useLiveControl(state => state.videoTrack.state.isEnabled);
    const volumeLevel = useLiveControl(state => state.audioTrack.state.volumeLevel);

    // 정지화면 캡처
    const PauseCanvasCapture = () => {
        if (canvasElRef.current && videoTrackRef.current && videoElRef.current) {
            
            if(!videoTrackRef.current.isPlaying) return;
            canvasElRef.current.style.opacity = "1";
            const canvas = canvasElRef.current;
            const ctx = canvas.getContext("2d");
        
            const ratio = 1.2; 
            const w = canvas.width * ratio; 
            const h = canvas.height * ratio; 
            
            canvas.width = w;
            canvas.height = h;
    
            ctx?.scale(ratio, ratio);
            ctx?.drawImage(videoElRef.current, 0, 0, canvas.width / ratio, canvas.height / ratio);
        }
    }

    const EraseCanvas = () => {
        if (canvasElRef.current) canvasElRef.current.style.opacity = "0";
    }

    const PlayAudio = () => {
        if (audioTrackRef.current && !audioTrackRef.current.isPlaying) {
            audioTrackRef.current.play();
        }
    }

    const MuteAudio = () => audioMute(true);
    const StopAudio = () => audioTrackRef.current?.stop();
    const SetAudio = () => {audioTrackRef.current?.setVolume(volumeLevel);}
    
    const PauseVideo = () => videoTrackRef.current?.stop();
    const PlayVideo = () => {
        if(videoTrackRef.current && videoElRef.current) 
            if(!videoTrackRef.current.isPlaying)
                videoTrackRef.current.play(videoElRef.current);
    }

    
    

    // 오디오 초기값 mute 세팅 (브라우저 정책 우회 위함)
    useEffect(()=>{MuteAudio()},[]);

    useEffect(() => {
        if (!audioTrackRef.current || !videoTrackRef.current) return;
        if (!audiolimit.current) audiolimit.current = true; 

        const VideoState = videoState ? "play" : "pause";
        const AudioState = isMuted ? "muted" : "unmuted";
      
        if (VideoState === "pause") {
            PauseCanvasCapture();
            PauseVideo();
            StopAudio(); 
        } else if (VideoState === "play") {
          PlayVideo(); 
          EraseCanvas();
          if (AudioState === "muted") {
            StopAudio(); 
          } else {
            PlayAudio(); 
            SetAudio(); 
          }
        }
      }, [isMuted, videoState, volumeLevel, PlayAudio, SetAudio]);
    return {
        EraseCanvas,
    }
}

export default useMediaControl;