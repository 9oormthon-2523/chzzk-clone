"use client"
import PlayerBottom from '../components/VideoPlayer/PlayerBottom/PlayerBottom.client' 
import PlayerHeader from '../components/VideoPlayer/PlayerHeader/PlayerHeader.client' 
import PlayerStateSign from '../components/VideoPlayer/ETC/PlayerStateSign.client'
import PlayerOverlay from '../components/VideoPlayer/ETC/PlayerOverlay.client' 
import { useHoverState, useVideoPlayerResize } from '../utils/VideoPlayerHook'
import useScreenControl from '@/app/_store/live/useScreenControl'
import useVideoControl from '@/app/_store/live/useVideoControl' 
import OpacityAnimation from '../utils/OpacityAnimation.client'
import React, { CSSProperties, ReactNode, useRef } from 'react'
import { getVideoRatio } from '../utils/getVideoRatio' 
import useLiveManager from '@/app/_hooks/live/useLiveManager'

/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

const VideoPlayer = () => {
  const dto = {

  }
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ratio } = useLiveManager({channel:"demo", videoRef, streaming_is_active:true});
  //추후 비디오 비율 대비 
  // const RATIO:[number, number] = [1378, 775];
  const RATE = ratio[0];
  const resizeRATE = ratio[1];

  //스크린 컨트롤 훅
  const screenControl = useScreenControl();
  //볼륨 의존성 get
  const volumeLevel = useVideoControl((state) => state.audioTrack.volumeLevel);
  //마우스 호버 훅
  const { isHover, HoverHandler } = useHoverState({delay:3000, dependencies:[volumeLevel]});
  //리사이즈 훅
  const {videoFrameRef, videoTotalRef, wh} = useVideoPlayerResize({resizeRATE,screenControl});
  
  const { isChatOpen, isFullOrWide } = screenControl;
  
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
            <video ref={videoRef} aria-label='비디오 대체 박스' className='w-full h-full bg-gray-700'/>
          </div>
        </div>
        
        {/* 비디오 플레이어 컨트롤러 */}
        <div style={videoControler_style} className="absolute max-h-[100vh]" onMouseMove={HoverHandler}>
          {/* 호버 래핑 */}
          <HoverWrapper isHover={isHover}>
            {/* 비디오 상태 애니메이션 */}
            <PlayerStateSign/>
            
            {/* 오버레이 */}
            <PlayerOverlay/>

            {/* 비디오 헤더 및 버튼 */}
            <PlayerHeader/>

            {/* 비디오 컨트롤러 */}
            <PlayerBottom/>

          </HoverWrapper>
        </div>
      </div>
    </div>
  );
}

 
export default VideoPlayer;

//Opacity 래핑
const Wrapper = ({children}: {children:ReactNode}) => <div>{children}</div>;
const HoverWrapper = OpacityAnimation(Wrapper);