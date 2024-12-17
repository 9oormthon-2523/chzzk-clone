import Bell from "@/../public/CzzIcon/bell.svg";
import BrokenHeart from "@/../public/CzzIcon/brokenHeart.svg";
import Category from "@/../public/CzzIcon/category.svg";
import Cheeze from "@/../public/CzzIcon/cheeze.svg";
import CrownCoin from "@/../public/CzzIcon/crownCoin.svg";
import Cup from "@/../public/CzzIcon/cup.svg";
import CZZcoin from "@/../public/CzzIcon/CZZcoin.svg";
import EmptyBrokenHeart from "@/../public/CzzIcon/emptyBrokenHeart.svg";
import EmptyHeart from "@/../public/CzzIcon/emptyHeart.svg";
import Enter from "@/../public/CzzIcon/enter.svg";
import FullHeart from "@/../public/CzzIcon/fullHeart.svg";
import Game from "@/../public/CzzIcon/game.svg";
import Key from "@/../public/CzzIcon/key.svg";
import Menu from "@/../public/CzzIcon/menu.svg";
import Moon from "@/../public/CzzIcon/moon.svg";
import OptionVertical from "@/../public/CzzIcon/option_vertical.svg";
import Option from "@/../public/CzzIcon/option.svg";
import Pc from "@/../public/CzzIcon/pc.svg";
import Sessor from "@/../public/CzzIcon/sessor.svg";
import Subscribe from "@/../public/CzzIcon/subscribe.svg";
import Ticket from "@/../public/CzzIcon/ticket.svg";
import Video from "@/../public/CzzIcon/video.svg";
import Setting from "@/../public/CzzIcon/setting.svg";
import LiveFollow from "@/../public/CzzIcon/liveFollow.svg";
import ChatFold from "@/../public/CzzIcon/chatFold.svg";
import Live from "@/../public/CzzIcon/live.svg";

/**
 * 원하는 SVG를 가져오는 컴포넌트
 */

const SvgComponents = {
    Bell,
    BrokenHeart,
    Category,
    Cheeze,
    CrownCoin,
    Cup,
    CZZcoin,
    EmptyBrokenHeart,
    EmptyHeart,
    Enter,
    FullHeart,
    Game,
    Key,
    Menu,
    Moon,
    OptionVertical,
    Option,
    Pc,
    Sessor,
    Subscribe,
    Ticket,
    Video,
    Setting,
    LiveFollow,
    ChatFold,
    Live,
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


    return <SelectedSvg className={className} width={width} height={height}/>;
};

export default SvgIcon;