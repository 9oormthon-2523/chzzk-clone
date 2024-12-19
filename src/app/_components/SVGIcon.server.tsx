

// 헤더
import HeaderBell from "@public/CzzIcon/Header/bell.svg"
import HeaderCategory from "@public/CzzIcon/Header/category.svg"
import HeaderCheeze from "@public/CzzIcon/Header/cheeze.svg"
import HeaderCrownCoin from "@public/CzzIcon/Header/crownCoin.svg"
import HeaderCup from "@public/CzzIcon/Header/cup.svg"
import HeaderFollow from "@public/CzzIcon/Header/follow.svg"
import HeaderKey from "@public/CzzIcon/Header/key.svg"
import HeaderMoon from "@public/CzzIcon/Header/moon.svg"
import HeaderPc from "@public/CzzIcon/Header/pc.svg"
import HeaderClip from "@public/CzzIcon/Header/clip.svg"
import HeaderTicket from "@public/CzzIcon/Header/ticket.svg"
import HeaderVideo from "@public/CzzIcon/Header/video.svg"


// 비디오
import VideoChatFold from "@public/CzzIcon/Video/chatFold.svg";
import VideoDots from "@public/CzzIcon/Video/dots.svg";
import VideoFullscreen from "@public/CzzIcon/Video/fullscreen.svg";
import VideoLive from "@public/CzzIcon/Video/live.svg";
import VideoFollow from "@public/CzzIcon/Video/follow.svg";
import VideoBrokenFollow from "@public/CzzIcon/Video/brokenFollow.svg";
import VideoUnFollow from "@public/CzzIcon/Video/unFollow.svg";
import VideoPause from "@public/CzzIcon/Video/pause.svg";
import VideoPlay from "@public/CzzIcon/Video/play.svg";
import VideoSetting from "@public/CzzIcon/Video/videoSetting.svg";
import VideoVolume0 from "@public/CzzIcon/Video/volume0.svg";
import VideoVolume100 from "@public/CzzIcon/Video/volume100.svg";
import VideoVolume50 from "@public/CzzIcon/Video/volume50.svg";
import VideoWidescreen from "@public/CzzIcon/Video/widescreen.svg";

//채팅
import ChatOption from "@public/CzzIcon/Chat/dots_vertical.svg";
import ChatFold from "@public/CzzIcon/Chat/exit.svg";
import ChatSetting from "@public/CzzIcon/Chat/setting.svg";

/**
 * 원하는 SVG를 가져오는 컴포넌트
 */

const SvgComponents = {
  // 헤더
  HeaderBell,
  HeaderCategory,
  HeaderCheeze,
  HeaderCrownCoin,
  HeaderCup,
  HeaderFollow,
  HeaderKey,
  HeaderMoon,
  HeaderPc,
  HeaderClip,
  HeaderTicket,
  HeaderVideo,

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