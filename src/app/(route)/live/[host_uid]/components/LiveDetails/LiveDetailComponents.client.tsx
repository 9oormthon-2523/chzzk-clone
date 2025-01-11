import React, { useEffect, useState } from 'react'

/**
 * 시청자 수랑 방송시간
 */

interface LiveDetailsViwerProps {
  viewers:number | null;
}

interface LiveDetailsTimeProps {
  startTime:string | null;
}

interface LiveCategoryProps {
  category: string | null
}

interface LiveNickName {
  nickname: string
}

interface HashTagProps {
  tags:string[] | null
}

interface HashTagLiProps {
  tagname:string
}

export const LiveDetailsViewer = (props:LiveDetailsViwerProps) => {
  const { viewers } = props;

  return (
    <strong id="시청자수" className="text-#2e3033 text-[12px] font-semibold relative leading-[25px]">
      { viewers ? `${viewers}명 시청 중 •`:""}
    </strong>
  )
}


export const LiveDetailsTime = (props: LiveDetailsTimeProps) => {
  const { startTime } = props;
  const [viewTime, setViewtime] = useState<string>("00:00:00");

  useEffect(() => {
    if (!startTime) return;

    const givenTime = new Date(startTime);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - givenTime.getTime();

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      setViewtime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <strong
      id="스트리밍시간"
      className="text-#2e3033 ml-[4px] text-[12px] font-semibold relative leading-[25px]"
    >
      {viewTime} 스트리밍 중
    </strong>
  );
};


export const LiveCategory = (props: LiveCategoryProps) => {
  const { category } = props;

  return (
    <div id="카테고리" className="p-0 inline-block">
        <span className="text-[#32bb81] font-blackHanSans text-[14px] gap-[2px_7px] tracking-[-0.3px] leading-[18px] min-w-0">          
            <span>{category}</span>
        </span>
    </div>
  )
}


export const LiveNickName = (props: LiveNickName) => {
  const { nickname } = props;
  return (
    <div role="paragraph" className="flex m-0 p-0">
        <div className="text-[#2e3033] text-[18px] leading-[22px] m-0 -mx-[6px] min-w-0 p-[4px_6px] relative font-bold">
            <a className="b-0 l-0 relative r-0 t-0"/>
            <span className="inline-flex max-w-[100%] align-top">
                <span style={{textOverflow:"ellipsis"}} className="pr-[1px] overflow-hidden whitespace-nowrap">
                    {nickname}
                </span>
            </span>
            
        </div>
    </div>
  )
}


export const LiveHashTag = (props: HashTagProps) => {
  const { tags } = props;

  return (
      <ul id="관련태그" className="text-[#898989] font-blackHanSans overflow-hidden flex flex-wrap items-center justify-center text-[9px] gap-[4px] ">
          {tags && tags.map((tag, idx) => (
          <HashTagLi key={`${tag}-${idx}`} tagname={tag} />
          ))}
      </ul>
  )
}


const HashTagLi = (props : HashTagLiProps) => {
  const { tagname } = props;

  return (
      <li className="m-0 p-0">
          <div className="inline-block align-top rounded-[5px] relative text-[inherit] border-[#00000026] border-solid border-[1px]">
              <span className="mt-[1px] break-words p-[0_6px] rounded-[5px] inline-block align-top">
                  { tagname }
              </span>
          </div>
      </li>
  )
}
