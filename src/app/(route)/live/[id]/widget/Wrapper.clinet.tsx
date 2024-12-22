"use client";

import useScreenControl from "@/app/_store/live/useScreenControl";
import { CSSProperties, ReactNode } from "react";

interface LiveWrapperProps {
  children: ReactNode;
}

const LiveWrapper = ({ children }: LiveWrapperProps) => {
  const { isFullOrWide, chatPosition, isChatOpen } = useScreenControl();

  const navPadding = 78; // 좌측 패딩

  // 컨테이너 스타일
  const containerStyle: CSSProperties = {
    position: isFullOrWide ? "fixed" : undefined,
    zIndex: isFullOrWide ? 20000 : undefined,
    width: isFullOrWide ? "100vw" : undefined,
    height: isFullOrWide ? "100vh" : undefined,
    left: isFullOrWide ? 0 : undefined,
    top: isFullOrWide ? 0 : undefined,
    backgroundColor: isFullOrWide ? "black" : undefined,
    minWidth: !isFullOrWide ? 840 : 440,
  }; 

  // 래퍼 스타일
  const wrapperStyle: CSSProperties = {
    flexDirection: chatPosition === "side" ? "row" : "column",
    height: isFullOrWide ? "100%" : "calc(100vh - 60px)", 
    justifyContent: !isChatOpen && isFullOrWide ? "center": undefined,
  };

  return (
    <div className="overflow-hidden relative" style={{ paddingLeft: `${navPadding}px` }}>
      <section
        id="vod-container"
        style={containerStyle}
        className="w-full overflow-hidden bg-[#f9f9f9]"
      >
        <div id="vod-wrapper" style={wrapperStyle} className="flex">
          {children}
        </div>
      </section>
    </div>
  );
};

export default LiveWrapper;
