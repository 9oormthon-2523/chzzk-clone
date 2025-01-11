"use client"
import React, { useEffect, useState } from "react";
import SvgIcon from "@/app/_components/SVGIcon.server";
import useVideoControl from "@/app/_store/live/useVideoControl";

/**
 *  재생 on/off 애니메이션
 */

const PlayerStateSign = () => {
    const isEnabled = useVideoControl((state) => state.videoTrack.isEnabled);
    const [opaticy, setOpaticy] = useState<number>(0);

    const triggerAnimation = () => {
      setOpaticy(0.9);
      setTimeout(() => {
        setOpaticy(0);
      }, 300);
    };
  
    useEffect(() => {
      triggerAnimation();

  }, [isEnabled]);

  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <div style={{opacity:opaticy}} className="p-[10] bg-[#0000002b] rounded-full transition-opacity delay-[0.5]">
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