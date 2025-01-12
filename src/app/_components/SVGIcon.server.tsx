// 비디오
import VideoChatFold from "@public/livePage/Video/chatFold.svg";
import VideoDots from "@public/livePage/Video/dots.svg";
import VideoFullscreen from "@public/livePage/Video/fullscreen.svg";
import VideoLive from "@public/livePage/Video/live.svg";
import VideoFollow from "@public/livePage/Video/follow.svg";
import VideoBrokenFollow from "@public/livePage/Video/brokenFollow.svg";
import VideoUnFollow from "@public/livePage/Video/unfollow.svg";
import VideoPause from "@public/livePage/Video/pause.svg";
import VideoPlay from "@public/livePage/Video/play.svg";
import VideoSetting from "@public/livePage/Video/videoSetting.svg";
import VideoVolume0 from "@public/livePage/Video/volume0.svg";
import VideoVolume100 from "@public/livePage/Video/volume100.svg";
import VideoVolume50 from "@public/livePage/Video/volume50.svg";
import VideoWidescreen from "@public/livePage/Video/widescreen.svg";

//채팅
import ChatOption from "@public/livePage/Chat/dots_vertical.svg";
import ChatFold from "@public/livePage/Chat/exit.svg";
import ChatSetting from "@public/livePage/Chat/setting.svg";

/**
 * 원하는 SVG를 가져오는 컴포넌트
 */

const SvgComponents = {
  // 비디오
  VideoChatFold,
  VideoDots,
  VideoFullscreen,
  VideoLive,
  VideoFollow,
  VideoUnFollow,
  VideoBrokenFollow,
  VideoPause,
  VideoPlay,
  VideoSetting,
  VideoVolume0,
  VideoVolume100,
  VideoVolume50,
  VideoWidescreen,

  // 채팅
  ChatOption,
  ChatFold,
  ChatSetting,
};

export type SvgComponentNames = keyof typeof SvgComponents;

interface SvgProps  {
    name: SvgComponentNames;
    className?: string;
    width?: number | string;
    height?: number | string;
};
  
const SvgIcon = (props: SvgProps) => {
    const { name, className, width, height } = props;
    const SelectedSvg = SvgComponents[name];

    if (!SelectedSvg) return <div>SVG not found</div>;

    return (
      <SelectedSvg
        className={className}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet" // 비율 유지하며 중앙에 맞춤
      />
    )
};

export default SvgIcon;
