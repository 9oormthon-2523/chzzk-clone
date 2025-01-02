/**
 * 오디오 정책 해제 훅
 */

import { RefObject, useEffect, useState } from "react";

interface useAudioUnlockProps {
    audioElRefs:RefObject<HTMLAudioElement[]>
}

const useAudioUnlock = (props:useAudioUnlockProps) => {
    const { audioElRefs } = props;
    const [audioLimit, setAudioLimit] = useState<boolean>(false); 
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();

    
    // 사용자 상호작용으로 AudioContext 활성화
    const audioUnlock = () => {
        if (audioContext.state === "suspended") {
            audioContext.resume()
                .then(() => {
                    setAudioLimit(true);
                    console.log("AudioContext 활성화 완료")
                })
                .catch((error) => console.error("AudioContext 활성화 실패:", error));
        }
    };

    useEffect(()=>{
        audioElRefs.current.forEach(track => {
            if (!track) return;
            console.log(track)
            track.muted = false;
            track.volume = 1;
            track.play();
            console.log(track.volume, track.muted);
        })
    },[audioLimit]);

    window.addEventListener("click", () => {
        audioUnlock();
    });

    return {
        audioLimit,
        audioUnlock,
    }
}

export default useAudioUnlock;