"use client"
import { useHoverState, useVideoPlayerResize } from '../utils/local/useVideoPlayerHook'
import React, { CSSProperties, ReactNode, useRef } from 'react'
import PlayerBottom from '../components/VideoPlayer/PlayerBottom/PlayerBottom.client' 
import PlayerHeader from '../components/VideoPlayer/PlayerHeader/PlayerHeader.client' 
import PlayerStateSign from '../components/VideoPlayer/ETC/PlayerStateSign.client'
import PlayerOverlay from '../components/VideoPlayer/ETC/PlayerOverlay.client' 
import OpacityAnimation from '../utils/local/useOpacityAnimation.client'
import useScreenControl from '@/app/_store/live/useScreenControl'
import useVideoControl from '@/app/_store/live/useVideoControl' 
import useLiveManager from '@/app/_hooks/live/useLiveManager'


/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

interface VideoPlayerProps {
  uid:string
  is_active:boolean
}

const VideoPlayer = (props:VideoPlayerProps) => {
  const { uid, is_active } = props;
  const audioElRef = useRef<HTMLAudioElement>(null);
  const screenElRef = useRef<HTMLVideoElement | null>(null);
  const isChatOpen = useScreenControl(state => state.isChatOpen);
  const isFullOrWide = useScreenControl(state => state.isFullOrWide);
  const { ratio:[ h_rate, w_rate ] } = useLiveManager({ channel:uid ,screenElRef , streaming_is_active:is_active, audioElRef:audioElRef });

  //리사이즈 훅
  const {videoFrameRef, videoTotalRef, wh} = useVideoPlayerResize({ w_rate });
  //볼륨 의존성 get
  const volumeLevel = useVideoControl((state) => state.audioTrack.volumeLevel);
  //마우스 호버 훅
  const { isHover, HoverHandler } = useHoverState({delay:3000, dependencies:[volumeLevel]});


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
    maxWidth: isFullOrWide ? (window.innerHeight * h_rate) + "px" : wh.h * h_rate + "px" 
  }

  const videoControler_style: CSSProperties = {
    width: `${wh.w}px`,  
    height: !isFullOrWide ? wh.h+"px" : !isChatOpen ? "100vh" : wh.h+"px",
    top: !isChatOpen || !isFullOrWide ? "0":"" 
  }
  //#endregion

  return (
    <div style={{ position: !isFullOrWide ? "relative" : undefined }}>

      <div aria-label='리사이즈 중 body-bg가 보이는 것을 방지' style={{height:wh.h}} className='absolute z-[0] w-screen bg-black'/>

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
          <div style={frameVideoPlayer_style} id="video-container" className='max-w-[100vw]'>
            <audio ref={audioElRef}/>
            <video ref={screenElRef} style={{objectFit:"contain"}} muted aria-label='비디오 대체 박스' id='streaming-video' className='w-full h-full'/>
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