"use client"
import useScreenControl from "@/app/_store/live/useScreenControl";
import { CSSProperties, ReactNode, useRef } from "react";

/**
 * 라이브 스트리밍 컨테이너 컴포넌트
 */

interface LiveStreamWrapperProps {
    children?: ReactNode
}

const LiveStreamWrapper = (props:LiveStreamWrapperProps) => {
    const { children } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const { isFullOrWide, chatPosition } = useScreenControl();

    const main_style: CSSProperties = {
        scrollbarWidth:'none', 
        flex: chatPosition === "side" ? "1 1 0%" : undefined,
        justifyContent: isFullOrWide ? "center" : undefined,
    };

    return (
        <main 
            id="view-steaming" 
            ref={containerRef}
            style={main_style}  
            className="flex flex-col min-w-[0] overflow-y-auto"
        >
            <div id="live-information-container" className="flex flex-col max-h-[100%]">
                { children }
            </div>

            {/* 광고란 */}    
            {!isFullOrWide &&<div id="live-banner-container" className=""></div>}

            {/* footer 정보란... */}
            {!isFullOrWide && (<footer className="border-t-[1px] border-solid border-[#0000001f] flex flex-wrap justify-center m-[0_30px] p-[25px_0_85px] items-center">

            </footer>)}

        </main>
)}

export default LiveStreamWrapper;