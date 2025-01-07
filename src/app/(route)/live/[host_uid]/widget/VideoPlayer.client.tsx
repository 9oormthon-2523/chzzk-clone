"use client"
import PlayerBottom from '../components/VideoPlayer/PlayerBottom/PlayerBottom.client' 
import PlayerHeader from '../components/VideoPlayer/PlayerHeader/PlayerHeader.client' 
import PlayerStateSign from '../components/VideoPlayer/ETC/PlayerStateSign.client'
import PlayerOverlay from '../components/VideoPlayer/ETC/PlayerOverlay.client' 
import { useHoverState, useVideoPlayerResize } from '../utils/local/useVideoPlayerHook'
import useScreenControl from '@/app/_store/live/useScreenControl'
import useVideoControl from '@/app/_store/live/useVideoControl' 
import OpacityAnimation from '../utils/local/useOpacityAnimation.client'
import React, { CSSProperties, ReactNode, useRef, useState } from 'react'
import useLiveManager from '@/app/_hooks/live/useLiveManager'
import { usePathname } from "next/navigation"

/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

const VideoPlayer = () => {
  const path = usePathname();
  const host_id = path.split('/')[2];
  const audioElRef = useRef<HTMLAudioElement>(null);
  const screenElRef = useRef<HTMLVideoElement | null>(null);

  const [streaming_is_active, setStreaming_is_active] = useState<boolean>(false);
  
  const { ratio } = useLiveManager({channel:host_id, host_id ,screenElRef , streaming_is_active, audioElRef:audioElRef });

  const RATE = ratio[0];
  const resizeRATE = ratio[1];

  //스크린 컨트롤 훅
  const screenControl = useScreenControl();
  //볼륨 의존성 get
  const volumeLevel = useVideoControl((state) => state.audioTrack.volumeLevel);
  //마우스 호버 훅
  const { isHover, HoverHandler } = useHoverState({delay:3000, dependencies:[volumeLevel]});
  //리사이즈 훅
  const {videoFrameRef, videoTotalRef, wh} = useVideoPlayerResize({resizeRATE, screenControl});
  
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
      <button aria-label="리얼 타임으로 streaming-on-off 대체 버튼" className=' p-2 top-[15px] rounded-full z-[10000] left-[160px] bg-red-600 text-[white] fixed' onClick={()=>{
        setStreaming_is_active(state => !state);
      }}>임시 스트리밍 버튼</button>

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
            {/* <video ref={screenElRef} className='w-full h-full bg-white'/> */}
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