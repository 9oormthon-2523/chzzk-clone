import React from 'react'

interface LiveNickName {
  nickname: string
}

const LiveNickName = (props: LiveNickName) => {
  const { nickname } = props;
  return (
    <div role="paragraph" className="flex m-0 p-0">
        <div className="text-[#2e3033] text-[18px] leading-[22px] m-0 -mx-[6px] min-w-0 p-[4px_6px] relative ">
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

export default LiveNickName