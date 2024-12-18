import React from 'react'
import SvgIcon from '../../../../../../_components/SVGIcon.server'

//모달 추가해야함..
function LiveOptionButton() {
  return (
    <button className="bg-gray-100 rounded-[17px] px-2 h-[34px] inline-flex items-center justify-center gap-x-[4px] text-sm leading-none font-sans cursor-pointer transition-all duration-200 ease-in-out relative align-top focus:outline-none">
        <SvgIcon name="Option" width={16} height={4}/>
    </button>
  )
}

export default LiveOptionButton