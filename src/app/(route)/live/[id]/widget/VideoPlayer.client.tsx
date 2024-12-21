"use client"

import PlayerBottom from '../components/LiveStreaming/VideoPlayer/PlayerBottom/PlayerBottom.client' 
import PlayerHeader from '../components/LiveStreaming/VideoPlayer/PlayerHeader/PlayerHeader.client' 
import PlayerStateSign from '../components/LiveStreaming/VideoPlayer/ETC/PlayerStateSign.client'
import PlayerOverlay from '../components/LiveStreaming/VideoPlayer/ETC/PlayerOverlay.client' 
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import useScreenControl from '@/app/_store/live/useScreenControl'
import useVideoControl from '@/app/_store/live/useVideoControl' 
import { getVideoRatio } from '../utils/getVideoRatio' 



/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

const VideoPlayer = () => {
  //추후 비디오 비율 대비 
  const RATIO:[number, number] = [1378, 775]
  const RATE = getVideoRatio(1980, 1080,'total');
  const resizeRATE = getVideoRatio(...RATIO, 'empty')
  const { volumeLevel } = useVideoControl().audioTrack;
  const { isChatOpen, isWideScreen, isFullscreen, isFullOrWide, chatPosition , updateChatPosition } = useScreenControl();
  const videoFrameRef = useRef<HTMLDivElement>(null); // 비디오 재생 프레임
  const videoTotalRef = useRef<HTMLDivElement>(null); // 비디오 재생 컨트롤
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머
  const [isHover, setIsHover] = useState<boolean>(false); // 커서 감지
  const [wh, setWH] = useState<{ w: number; h: number }>({ w: 0, h: 0 }); //화면 크기

  // 비디오 플레이어의 창 크기는 16:9 비율 고정
  const resizeHandler = () => {
    if (!videoFrameRef.current) return;
    // 컨트롤러 창 크기 조절
    const height = videoFrameRef.current.clientWidth * resizeRATE;
    videoFrameRef.current.style.height = `${height}px`;
    
    if (!videoTotalRef.current) return;

    // TotalRef의 w,h를 기져옴
    setWH({
      w: videoTotalRef.current.clientWidth,
      h: videoTotalRef.current.clientHeight,
    });

    if(!isChatOpen || !isFullOrWide) return;
    //채팅창 가로 or 세로 배치 비율 구함
    updateChatPosition(resizeRATE);
  };

  // 리사이즈 이벤트
  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [isChatOpen, isWideScreen, isFullscreen, chatPosition]);

  // cursor Move -> video controll turn on
  // stop 3s -> video controll turn off
  const HoverHandler = () => {
    setIsHover(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsHover(false);
    }, 3000);
  };

  //볼륨 컴포넌트에 이벤트 버블링을 중단했기 때문에 의존성 연결
  useEffect(()=>{
    HoverHandler();
    return () => {if (timerRef.current) clearTimeout(timerRef.current);}
  },[volumeLevel])

  
  /** 동적 스타일 **/
  //#region
  const container_style: CSSProperties = {
    maxHeight: !isFullOrWide ? "calc(100vh - 226px)" : undefined,
    marginRight : !isFullOrWide ? "4px" : undefined,
    position : !isFullOrWide ? "relative" : undefined
  }

  const containerVideoPlayer_style: CSSProperties = {
    width: !isFullOrWide && isChatOpen ?  wh.w : wh.w,
    height:wh.h, 
  }

  const frameVideoPlayer_style: CSSProperties = {
    width:"100%", 
    height:wh.h, 
    maxWidth: isFullOrWide ? (window.innerHeight * RATE) + "px" : wh.h * RATE + "px" 
  }

  const videoControler_style: CSSProperties = {
    width: `${wh.w}px`, 
    // height: !isFullOrWide || cha
    // height: (!isFullOrWide || chatPosition === "side") ? wh.h+"px" : "100vh", 
    height: !isFullOrWide ? wh.h+"px" : !isChatOpen ? "100vh" : wh.h+"px",
    top: !isChatOpen || !isFullOrWide ? "0":"" 
  }

  //#endregion

  return (
    <div style={{ position: !isFullOrWide ? "relative" : undefined }}>
      <div 
        aria-label='비디오 컨테이너'
        ref={videoTotalRef} 
        id="live-video-container"
        style={container_style} 
        className="flex w-full overflow-hidden box-border"
      >
        
        {/* 비디오 프레임 비율을 위한 빈 박스 height가 auto라 필요함 */}
        <div aria-label='비디오 컨테이너 빈 박스 (비율)' ref={videoFrameRef} id="live-video-null-box" className="w-full"/>

        {/* 비디오 재생 프레임 */}
        <div 
          aria-label='비디오 재생 프레임' 
          style={containerVideoPlayer_style}
          className="absolute bg-black flex items-center justify-center box-border"
          >   
          <div style={frameVideoPlayer_style}>
            <canvas aria-label='비디오 대체 박스' className='w-full h-full bg-gray-700'/>
          </div>
        </div>
        
        {/* 비디오 플레이어 컨트롤러 */}
        <div style={videoControler_style} className="absolute" onMouseMove={HoverHandler}>

          {/* 비디오 상태 애니메이션 */}
          <PlayerStateSign/>
          {/* 오버레이 */}
          <PlayerOverlay isHover={isHover} />

          {/* 비디오 헤더 및 버튼 */}
          <PlayerHeader isHover={isHover} />

          {/* 비디오 컨트롤러 */}
          <PlayerBottom isHover={isHover}/>

        </div>
      </div>
    </div>
  );
}

 
export default VideoPlayer;