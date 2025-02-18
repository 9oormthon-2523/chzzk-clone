"use client"

import useScreenControl from "@/app/_store/stores/live/useScreenControl";
import useVideoControl from "@/app/_store/stores/live/useVideoControl";
import PlayerBottomButton from "./PlayerBottomButton.client";
import PlayerBottomBolumeControl from "./PlayerBottomVolume";

// 와이드
export const WideBtn = () => {
    const toggleWideScreen = useScreenControl(state => state.toggleWideScreen);
    const isFullscreen = useScreenControl(state => state.isFullscreen);

    return (
        <>
            {!isFullscreen &&
                <PlayerBottomButton info="와이드 모드" onClick={toggleWideScreen} svgName="VideoWidescreen" style=""/>
            }
        </>
    )
}

// 풀 스크린
export const FullBtn = () => {
    const toggleFullscreen = useScreenControl(state => state.toggleFullscreen);

    return (
        <PlayerBottomButton info="전체 화면" onClick={toggleFullscreen} svgName="VideoFullscreen" style="pl-[2.2px] pt-[2.2px]"/>
    )
}

// 정지,재생
export const PlayPauseBtn = ()=> {
    const isEnabled = useVideoControl(state => state.videoTrack.isEnabled);
    const videoToggle = useVideoControl(state => state.videoToggle);

    return (
        <PlayerBottomButton info={isEnabled ? "정지" : "재생"} svgName={`${isEnabled ? "VideoPause" : "VideoPlay"}`} style="" onClick={videoToggle}/>
    )
}

// 볼륨륨
export const VolumeBtn = () => {
    const volumeLevel = useVideoControl(state => state.audioTrack.volumeLevel);
    const isMuted = useVideoControl(state => state.audioTrack.isMuted);
    const audioMute = useVideoControl(state => state.audioMute);

    //svg 추출
    const getVolumeIcon = () => {
        const volume = volumeLevel;
      
        if (isMuted === true) return "VideoVolume0"; 
        if (50 < volume) return "VideoVolume100";
        if (1 < volume) return "VideoVolume50";
      
        return "VideoVolume0";
      };

    const volumeMute = () => audioMute(!isMuted);
    
    return (
        <>
            <PlayerBottomButton info="볼륨 조절" svgName={getVolumeIcon()} style="mb-4 scale-[90%]" onClick={volumeMute}/>
            <PlayerBottomBolumeControl/>
        </>
    )
}

