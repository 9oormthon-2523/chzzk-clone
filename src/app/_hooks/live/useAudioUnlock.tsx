import { RefObject, useEffect, useState } from "react";

// 오디오 정책 해제 훅
const useAudioUnlock = (
  audioElRef: React.RefObject<HTMLAudioElement | null> ,
  limitRef: RefObject<boolean>,
  isMuted: boolean,
) => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();

    const audioUnlock = () => {
        console.log(audioContext.state);
        if (audioContext.state === "suspended" && !limitRef.current) {
            audioContext.resume().then(() => {
                limitRef.current = true;
                console.log("AudioContext 활성화 완료");
                const track = audioElRef.current;
                if (!track) return;
                if(!isMuted) track.muted = false;
                track.play().catch((error) => console.error("오디오 재생 오류:", error)); 
                console.log("오디오 트랙 재생 시작:", track);
            }).catch((error) => {
                console.error("AudioContext 활성화 실패:", error)
                limitRef.current = false;
                const track = audioElRef.current;
                if (!track) return;
                track.muted = true;
            });
        }
    };
  
    
    useEffect(() => {
        window.addEventListener("click", audioUnlock);
        return () => window.removeEventListener("click", audioUnlock);
    }, []);
    return {
      limitState:audioContext.state === "running"
    }
};

export default useAudioUnlock;