"use client"
import React, { useEffect, useRef } from "react";
import SvgIcon from "@/app/_components/SVGIcon.server";
import useVideoControl from "@/app/_store/stores/live/useVideoControl";

const PlayerStateSign = () => {
    // 잔렌더 줄이기 위해 상태 구독 사용함
    const isEnabled = useVideoControl((state) => state.videoTrack.isEnabled);
    const ref = useRef<HTMLDivElement>(null);
    let limit = useRef<boolean>(false)


  // 비디오 상태 변화 애니메이션
  const triggerAnimation = () => {
    if (!ref.current) return;

    if(!limit.current) {limit.current = true; return}

    ref.current.style.opacity = "0.9"; 
    setTimeout(() => {
      if (ref.current) ref.current.style.opacity = "0";
    }, 300);
  };

  useEffect(() => {
    triggerAnimation();
    return () => {
      if (ref.current) ref.current.style.opacity = "";
    };
  }, [isEnabled]);

  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <div ref={ref} className="p-[10] bg-[#0000002b] rounded-full opacity-0 transition-opacity delay-[0.5]">
        {isEnabled ? (
          <SvgIcon name="VideoPlay" height={90} width={90} className="pl-[8px]" />
        ) : (
          <SvgIcon name="VideoPause" height={90} width={90} className="text-[#fff]" />
        )}
      </div>
    </div>
  );
};

export default React.memo(PlayerStateSign);
