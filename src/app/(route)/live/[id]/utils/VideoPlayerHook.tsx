import { screenControlState } from "@/app/_store/live/useScreenControl";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import { useCallback, useEffect, useRef, useState } from "react";

interface useVideoPlayerResizeProps {
    resizeRATE: number, //리사이즈 비율
    screenControl:screenControlState, //스크린 컨트롤 훅
}

export const useVideoPlayerResize = (props: useVideoPlayerResizeProps) => {
    const { 
        resizeRATE,
        screenControl,
     } = props;

    const [wh, setWH] = useState({ w: 0, h: 0 });
    const videoFrameRef = useRef<HTMLDivElement|null>(null); // 비디오 재생 프레임
    const videoTotalRef = useRef<HTMLDivElement|null>(null); // 비디오 재생 컨트롤 프레임
    const { isChatOpen, isFullscreen, chatPosition , isWideScreen, updateChatPosition } = screenControl;
    const isNavOpen = useNavToggle(state => state.isOpen);

    //비디오 플레이어 창 핸들러
    const resizeHandler = () => {
        if (!videoFrameRef.current) return;
        const height = videoFrameRef.current.clientWidth * resizeRATE;
        videoFrameRef.current.style.height = `${height}px`;
    
        if (!videoTotalRef.current) return;
        
        setWH({
          w: videoTotalRef.current.clientWidth,
          h: videoTotalRef.current.clientHeight,
        });
        // if(!isChatOpen || !isFullOrWide) return;
        updateChatPosition(resizeRATE);
      };
    
      useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => window.removeEventListener("resize", resizeHandler);
      }, [isChatOpen, isWideScreen, isFullscreen, chatPosition, isNavOpen]);

      return { videoFrameRef, videoTotalRef, wh };
}

interface useHoverStateProps<T> {
    delay?:number
    dependencies?: T[]
}

export const useHoverState = <T extends unknown>(props: useHoverStateProps<T>) => {
    const { delay = 3000, dependencies = [] } = props;

    const [isHover, setIsHover] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
  
    //3초 동안 Hover가 안꺼짐
    const HoverHandler = useCallback(() => {
      setIsHover(true);
      if (timerRef.current) clearTimeout(timerRef.current);
  
      timerRef.current = setTimeout(() => {
        setIsHover(false);
      }, delay);
    }, [delay]);

    // 마우스 이동 감지 + 의존성
    useEffect(()=>{
        HoverHandler();
        return () => {if (timerRef.current) clearTimeout(timerRef.current);}
    },[...dependencies]);

    return { isHover, HoverHandler };
};