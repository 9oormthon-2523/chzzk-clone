"use client"
import useVideoControl from "@/app/_store/stores/live/useVideoControl";
import React from "react";

/**
 * 비디오 오버레이 컴포넌트 
 * 스타일 용 
 */

const PlayerOverlay = () => {
    const BGCOLOR = "#1c1c1c";
    const PERCENT = 15;
    const style = { background: `linear-gradient(180deg, ${BGCOLOR} 0%, rgba(0, 0, 0, 0) ${PERCENT}%, rgba(0, 0, 0, 0) ${100 - PERCENT}%, ${BGCOLOR} 100%)`}
    const {videoToggle} = useVideoControl();
    return <div onClick={videoToggle} style={style} aria-label="비디오 오버레이 박스" className={`absolute w-full h-full`}/>
    
}

//리사이즈 될 때마다 불필요하게 렌더링 되서 memo사용
export default React.memo(PlayerOverlay);
