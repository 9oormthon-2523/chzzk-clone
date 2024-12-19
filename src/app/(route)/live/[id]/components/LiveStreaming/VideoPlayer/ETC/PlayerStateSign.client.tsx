import { useEffect, useRef } from "react";
import SvgIcon from "@/app/_components/SVGIcon.server";
import useVideoControl from "@/app/_store/live/useVideoControl"

/**
 * 정지나 플레이를 보여주는 애니메이션
 */

const PlayerStateSign = () => {
    const { isEnabled } = useVideoControl().videoTrack;

    const ref = useRef<HTMLDivElement>(null);
    const animation = () => {
        if(!ref.current) return;

        ref.current.style.opacity = "0.9";

        setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = "0"; // 숨김 효과
            }
        }, 300); // 500ms 후 동작    
    }

    useEffect(() => {
        animation();
        //클린업
        return () => { if (ref.current) ref.current.style.opacity = ""; };
    }, [isEnabled]);

    return (
        <div className="w-full h-full absolute flex items-center justify-center">
            <div ref={ref} className="p-[10] bg-[#0000002b] rounded-full opacity-0 transition-opacity delay-[0.5]">
                {
                    isEnabled ? <SvgIcon name="VideoPlay" height={90} width={90} className="pl-[8px]"/> :
                    <SvgIcon name="VideoPause" height={90} width={90} className="text-[#fff]" />
                }
            </div>
        </div>
    ) 
}

export default PlayerStateSign