import PlayerOverlay from './ETC/PlayerOverlay.client';
import React, { useEffect, useRef, useState } from 'react'
import PlayerStateSign from './ETC/PlayerStateSign.client';
import useChatToggle from '@/app/_store/live/useChatToggle';
import PlayerBottom from './PlayerBottom/PlayerBottom.client';
import PlayerHeader from './PlayerHeader/PlayerHeader.client';
import useVideoControl from '@/app/_store/live/useVideoControl';
import {getVideoRatio} from '../../../utils/getVideoRatio';


/**
 * 라이브 스트리밍 플레이어 컴포넌트
 */

const VideoPlayer = () => {
  //추후 비디오 비율 대비 
  const RATIO:[number, number] = [1980, 1080]
  const RATE = getVideoRatio(1980, 1080,'total');
  const resizeRATE = getVideoRatio(...RATIO, 'empty')

  const { isFold } = useChatToggle();
  const { volumeLevel } = useVideoControl().audioTrack;
  
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
    
  };

  // 리사이즈 이벤트
  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [isFold]);

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


  return (
    <div ref={videoTotalRef} id="live-information-player" className="flex overflow-hidden relative">
      
      {/* 비디오 프레임 비율을 위한 빈 박스 */}
      <div ref={videoFrameRef} id="live-information-video" className="w-full bg-white mr-[4px]"/>

      {/* 비디오 재생 프레임 */}
      <div style={{width:wh.w, height:wh.h}} className="absolute bg-black flex items-center justify-center">
        <div style={{width:wh.h * RATE, height:wh.h}}>
          <div aria-label='비디오 대체 박스' className='w-full h-full bg-gray-700'/>
        </div>
      </div>
      
      {/* 비디오 플레이어 컨트롤러 */}
      <div style={{ width: `${wh.w}px`, height: `${wh.h}px`}} className="absolute" onMouseMove={HoverHandler}>

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
  );
}

 
export default VideoPlayer;