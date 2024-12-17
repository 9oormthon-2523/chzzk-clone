import React from 'react'
import SvgIcon from '../../_utils/SVGIcon.server'

function LiveFollowButton() {
    
  return (
    <div className="mr-[6px] relative">
        <button className="bg-[#1bb373] text-[#fff] rounded-[17px] pr-[16px] pl-[12px] h-[34px] inline-flex items-center justify-center gap-x-[4px] text-sm leading-none font-sans cursor-pointer transition-all duration-200 ease-in-out relative align-top focus:outline-none">
            <SvgIcon name="LiveFollow" width={20} height={20} />
            <span>팔로우</span>
        </button>
    </div>
  )
}

export default LiveFollowButton