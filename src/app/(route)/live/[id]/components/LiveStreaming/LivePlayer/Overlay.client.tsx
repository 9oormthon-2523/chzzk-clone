"use client"

import OpacityAnimation from "../../utils/OpacityAnimation.client";

/**
 * 비디오 오버레이 컴포넌트 
 * 스타일 용 
 */

function Overlay() {
    const BGCOLOR = "#313131";
    const PERCENT = 20
    const style = { background: `linear-gradient(180deg, ${BGCOLOR} 0%, rgba(0, 0, 0, 0) ${PERCENT}%, rgba(0, 0, 0, 0) ${100 - PERCENT}%, ${BGCOLOR} 100%)`}

    return <div style={style} aria-label="비디오 오버레이 박스" className={`absolute w-full h-full`}/>
    
}

//애니메이션 적용
const PlayerOverlay = OpacityAnimation(Overlay);
export default PlayerOverlay;