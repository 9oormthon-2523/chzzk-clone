"use client"

import SvgIcon, { SvgComponentNames } from "@/app/_components/SVGIcon.server";
import useVolumeControl from "@/app/_store/live/useVolumeControl";
import { useState } from "react";
import OpacityAnimation from "../../../utils/OpacityAnimation.client";

function Bottom(){
    const playState = false;

    return (
        <div className="absolute right-[23px] left-[18px] bottom-[7px]">
            <div className="flex relative h-[36px] justify-between w-full">
            <div className="min-w-0 items-center flex left-0 relative">
                    <PlayerBottomButton info="정지" svgName="VideoPause" style=""/>
                    <PlayerBottomButton info="볼륨 조절" svgName="VideoVolume50" style="mb-4 scale-[90%]"/>
                    <PlayerBottomBolumeControl/>
                </div>

                <div className="min-w-0 items-center flex left-0 relative">
                    <PlayerBottomButton info="설정" svgName="VideoSetting" style=""/>
                    <PlayerBottomButton info="와이드 모드" svgName="VideoWidescreen" style="pb-1"/>
                    <PlayerBottomButton info="전체 화면" svgName="VideoFullscreen" style=""/>
                </div>

            </div>
        </div>
    )
}

const PlayerBottom = OpacityAnimation(Bottom);
export default PlayerBottom;

//커스텀 버튼
interface PlayerBottomButtonProps {
    svgName: SvgComponentNames
    style?: string
    info:string
    onClick?: () => void
    onHover?: () => void
}

function PlayerBottomButton({
    svgName,
    style,
    info,
    onClick,
    onHover,
}:PlayerBottomButtonProps) {
    return (
        <button aria-label={info} className="text-[#fff] w-[34px] h-[34px] rounded-full hover:bg-[#ffffff20] m-[4px] relative flex group">
            <span className="absolute top-[-46px] bg-[#00000099] rounded-[14px] text-[#fff] text-[13px] h-[27px] left-[50%] m-0 p-[0_12px] text-center translate-x-[-50%] flex items-center justify-center max-w-[200px] truncate opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                {info}
            </span>

            <span className={`w-[32px] h-[32px] overflow-hidden m-0 p-0 align-baseline`}>
                <SvgIcon name={svgName} width={34} height={34} className={`align-top text-[#fff] ${style}`}/> 
            </span>
        </button>

    )
}

//볼륨 조절 버튼
function PlayerBottomBolumeControl() {
    const { volume, volumeControl } = useVolumeControl();

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        volumeControl(newVolume); 
        e.target.style.background = `linear-gradient(to right, #527cdc ${newVolume}%, #e5e5e5 ${newVolume}%)`;
    };

    return (
        <div className="flex items-center justify-center w-[84px]">
            <input
                type="range" 
                aria-label="볼륨 조절"
                id="volume-range"
                min={0} 
                max={100}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange} //볼륨 조절
                onMouseMove={e => {e.stopPropagation();}} // 이벤트 버블링을 막음 (부모 요소의 move이벤트에 덧 씌워져 슬라이딩이 막힘)
                className="w-full h-[2.3px] mt-[1px] bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-500 "
                style={{ background: `linear-gradient(to right, #527cdc ${Number(volume)}%, #e5e5e5 ${Number(volume)}%)`}}
            />
        </div>
    )
}