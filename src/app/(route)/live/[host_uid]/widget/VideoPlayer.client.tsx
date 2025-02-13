"use client"
import { useHoverState, useVideoPlayerResize } from '@/app/_utils/live/local/useVideoPlayerHook'
import React, { ReactNode } from 'react'
import PlayerBottom from '../components/VideoPlayer/PlayerBottom/PlayerBottom.client' 
import PlayerHeader from '../components/VideoPlayer/PlayerHeader/PlayerHeader.client' 
import PlayerStateSign from '../components/VideoPlayer/ETC/PlayerStateSign.client'
import PlayerOverlay from '../components/VideoPlayer/ETC/PlayerOverlay.client' 
import OpacityAnimation from '@/app/_utils/live/local/useOpacityAnimation.client'

// 스타일
import { 
  container_style, 
  videoControler_style, 
  frameVideoPlayer_style, 
  containerVideoPlayer_style 
} from '../style/VideoPlayerStyle'
import useLiveControl from '@/app/_store/stores/live/useLiveControl'
import useLive from '@/app/_hooks/live/useLive'

/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

interface VideoPlayerProps {
  uid:string
  is_active:boolean
}

const VideoPlayer = (props:VideoPlayerProps) => {
  const { uid, is_active } = props;
  const isChatOpen = useLiveControl(state => state.screen.state.isChatOpen);
  const isFullOrWide = useLiveControl(state => state.screen.state.isFullOrWide);

  // 라이브 스트리밍 훅
  const {
    videoElRef,
    audioElRef,
    canvasElRef,
    ratio:[h_rate, w_rate],
  } = useLive({ host_uid: uid, streaming_is_active: is_active });

  //마우스 호버 훅
  const { isHover, HoverHandler } = useHoverState({});

  //리사이즈 훅
  const {videoFrameRef, videoTotalRef, wh} = useVideoPlayerResize({ w_rate });

  return (
    <div style={{ position: !isFullOrWide ? "relative" : undefined }}>

      <div 
        aria-label='리사이즈 중 body-bg가 보이는 것을 방지하는 빈박스' 
        style={{ height:wh.h }} 
        className='absolute z-[0] w-screen bg-black'
      />

        <div 
          aria-label='비디오 컨테이너'
          ref={videoTotalRef} 
          id="live-video-container"
          style={container_style(isFullOrWide)} 
          className="flex w-full overflow-hidden box-border"
        >
        
          <div 
            aria-label='비디오 컨테이너 빈 박스 (비율 전용)' 
            ref={videoFrameRef} 
            id="live-video-null-box" 
            className="w-full"
          />

        {/* 비디오 재생 프레임 */}
          <div 
            aria-label='비디오 재생 프레임' 
            style={containerVideoPlayer_style(isFullOrWide, isChatOpen, wh)}
            className="absolute bg-black flex items-center justify-center box-border"
          >   
            <div 
              id="video-container"
              style={frameVideoPlayer_style(isFullOrWide, wh, h_rate)} 
              className='max-w-[100vw]'
            >
              <audio ref={audioElRef}/>

              <canvas 
                // ref={canvaseElRef} 
                ref={canvasElRef} 
                className='absolute' 
                style={frameVideoPlayer_style(isFullOrWide, wh, h_rate)} 
              />
               
              <video 
                aria-label='비디오 대체 박스' 
                id='streaming-video'
                // ref={screenElRef} 
                ref={videoElRef}
                style={{objectFit:"scale-down"}} 
                muted 
                className='w-full h-full'
              >
               
              </video>
            </div>

          </div>
        
        {/* 비디오 플레이어 컨트롤러 */}
        <div style={videoControler_style(isFullOrWide, isChatOpen, wh)} className="absolute max-h-[100vh]" onMouseMove={HoverHandler}>
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