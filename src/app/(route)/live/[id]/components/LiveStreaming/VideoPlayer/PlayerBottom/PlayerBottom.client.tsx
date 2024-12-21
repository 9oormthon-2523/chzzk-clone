"use client"
import OpacityAnimation from "../../../../utils/OpacityAnimation.client";
import { SvgComponentNames } from "@/app/_components/SVGIcon.server";
import useVideoControl from "@/app/_store/live/useVideoControl";
import PlayerBottomButton from "./PlayerBottomButton.client";
import PlayerBottomBolumeControl from "./PlayerBottomVolume";
import useScreenControl from "@/app/_store/live/useScreenControl";

/**
 * 비디오 플레이어 바텀
 * 비디오 플레이어를 조정 할 수 있는 기능들이 있습니다.
 */

const Bottom = () => {
    
    const { videoToggle, volumeControl, videoTrack, audioTrack } = useVideoControl();
    const { toggleFullscreen, toggleWideScreen, isFullscreen } = useScreenControl();

    //svg 추출
    const getVolumeIcon = ():SvgComponentNames => {
        const volume = audioTrack.volumeLevel;

        if (50 < volume) return "VideoVolume100";

        if (1 < volume) return "VideoVolume50";

        return "VideoVolume0";
    }

    const volumeMute = () => volumeControl(0);

    return (
        <div className="absolute right-[23px] left-[18px] bottom-[7px]">
            <div className="flex relative h-[36px] justify-between w-full">
                <div className="min-w-0 items-center flex left-0 relative">
                    <PlayerBottomButton info="정지" svgName={`${videoTrack.isEnabled ? "VideoPause" : "VideoPlay"}`} style="" onClick={videoToggle}/>
                    <PlayerBottomButton info="볼륨 조절" svgName={getVolumeIcon()} style="mb-4 scale-[90%]" onClick={volumeMute}/>
                    <PlayerBottomBolumeControl/>
                </div>

                <div className="min-w-0 items-center flex left-0 relative">
                    <PlayerBottomButton info="설정" svgName="VideoSetting" style="pl-[2.2px] pt-[2.2px]"/>
                    {/* 전체 화면 일때 와이드 버튼 없음  */}
                    {!isFullscreen &&
                        <PlayerBottomButton onClick={toggleWideScreen} info="와이드 모드" svgName="VideoWidescreen" style=""/>}
                    <PlayerBottomButton onClick={toggleFullscreen} info="전체 화면" svgName="VideoFullscreen" style="pl-[2.2px] pt-[2.2px]"/>
                </div>

            </div>
        </div>
    )
}

const PlayerBottom = OpacityAnimation(Bottom);
export default PlayerBottom;


