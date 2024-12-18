import useChatToggle from '@/app/_store/live/useChatToggle';
import React, { useEffect, useRef, useState } from 'react'
import PlayerHeader from './Header.client';
import PlayerOverlay from './Overlay.client';

/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

export default function LivePlayer() {
  const RATE = 0.5625;

  const { isFold } = useChatToggle();
  
  const videoFrameRef = useRef<HTMLDivElement>(null); // 비디오 재생 프레임
  const videoControlRef = useRef<HTMLDivElement>(null); // 비디오 재생 컨트롤 
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 
  const [isHover, setIsHover] = useState<boolean>(false);

  // 비디오 플레이어의 창 크기는 16:9 비율 고정
  const resizeHandler = () => {
      if (!videoFrameRef.current) return;
      const height = videoFrameRef.current.clientWidth * RATE;
      videoFrameRef.current.style.height = `${height}px`; 

      // 컨트롤러 창 크기 조절
      if (!videoControlRef.current) return;
      videoControlRef.current.style.height = `${height}px`; 
  };
      
  // 리사이즈 이벤트
  useEffect(()=>{
      if (!videoFrameRef.current) return;
      resizeHandler();
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
  },[isFold])  
  
  // cursor Move -> video controll turn on
  // stop 3s -> video controll turn off
  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  
    if (timerRef.current) clearTimeout(timerRef.current);
  
    timerRef.current = setTimeout(() => {
      setIsHover(false);
    }, 3000);
  };

  useEffect(()=>{
    console.log(isHover)
  },[isHover])

  return (
    <div id="live-information-player" className="flex overflow-hidden relative">
        {/* 비디오 */}
        <div ref={videoFrameRef} id="live-information-video" className="w-full bg-white mr-[4px]">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0MbzDJ7QeRhZSp0jiB_E02nvOhiqWtQt_w&s' className='w-full h-full'/>
        </div>

        {/* 비디오 플레이어 컨트롤러 */}
        <div 
          ref={videoControlRef} 
          className='absolute w-full'
          onMouseMove={mouseMoveHandler}
        >
          <PlayerOverlay isHover={isHover}/>
          <PlayerHeader isHover={isHover}/>
          
        </div>

    </div>
  )
}

 