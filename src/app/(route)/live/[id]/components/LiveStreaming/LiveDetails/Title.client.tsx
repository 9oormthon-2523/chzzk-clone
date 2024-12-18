import React from 'react'

function LiveTitle({ title }:{title : string }) {
  return (
    <div id="live-informaiton-details-row" className="items-start flex w-full">
        <h2 className="text-[#2e3033] text-[22px] font-bold tracking-[-0.3px] leading-[28px]">
            {title}
        </h2>
    </div>
  )
}

export default LiveTitle