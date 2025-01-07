"use client"
import Footer from "@/app/_components/Footer/footer";
import useScreenControl from "@/app/_store/live/useScreenControl";
import React, { CSSProperties, ReactNode, useRef } from "react";

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

    const container_style: CSSProperties = {
        maxHeight: !isFullOrWide ? "100%" : undefined
    }

    return (
        <main 
            id="view-steaming" 
            ref={containerRef}
            style={main_style}  
            className="flex flex-col min-w-[0] overflow-y-auto"
        >
            <div style={container_style} id="live-information-container" className="flex flex-col">
                { children }
            </div>

            {/* 광고란 */}    
            {!isFullOrWide &&<div id="live-banner-container" className=""></div>}

            {/* footer 정보란... */}
            {!isFullOrWide && (
                <Footer/>
            )}

        </main>
)}

export default LiveStreamWrapper;