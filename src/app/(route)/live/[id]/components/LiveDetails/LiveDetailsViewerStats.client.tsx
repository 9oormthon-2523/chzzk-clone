import React from 'react'

/**
 * 시청자 수랑 방송시간
 */

interface LiveViewerAndTimeProps {
  viewers:number;
  startTime:string;
}

const LiveDetailsViewerStats = (props: LiveViewerAndTimeProps) => {
  //방송 시작 시간 받아서 가공해 사용할 예정
  //시간 데이터를 아직 모름...
  const { viewers, startTime} = props
  
  return (
    <div id="시청자 및 시간" className="items-center flex flex-wrap gap-[2px_6px] mt-[4px] w-full">
        <strong id="시청자수" className="text-#2e3033 text-[13px] leading-[16px] font-semibold translate-[-.3px] pr-[8px] relative">
            {viewers} 시청중
        </strong>
        <strong id="스트리밍시간" className="text-#2e3033 text-[13px] leading-[16px] font-semibold translate-[-.3px] pr-[8px] relative">
            {startTime} 스트리밍 중
        </strong>
    </div>
      
  )
}

export default LiveDetailsViewerStats