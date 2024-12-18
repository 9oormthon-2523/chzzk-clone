import useChatToggle from '@/app/_store/live/useChatToggle';
import React, { useEffect, useRef } from 'react'
import PlayerHeader from './Header.client';

/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

export default function LivePlayer() {
  const RATE = 0.5625;

  const { isFold } = useChatToggle();
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoControlRef = useRef<HTMLDivElement>(null);
  

  //비디오 플레이어의 창 크기는 16:9 비율 고정
  const resizeHandler = () => {
      if (!videoFrameRef.current) return;
      const height = videoFrameRef.current.clientWidth * RATE;
      videoFrameRef.current.style.height = `${height}px`; 

      //컨트롤러 창 크기 조절
      if (!videoControlRef.current) return;
      videoControlRef.current.style.height = `${height}px`; 
  };
      
  //리사이즈 이벤트
  useEffect(()=>{
      if (!videoFrameRef.current) return;
      resizeHandler();
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
  },[isFold])

  return (
    <div id="live-information-player" className="flex overflow-hidden relative">
        {/* 비디오 */}
        <div ref={videoFrameRef} id="live-information-video" className="w-full bg-black mr-[4px]">
    
        </div>

        {/* 비디오 플레이어 컨트롤러 */}
        <div ref={videoControlRef} className='absolute w-full'>
          <PlayerHeader/>
        </div>

    </div>
  )
}

 