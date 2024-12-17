import React from 'react'
import SvgIcon, { SvgComponentNames } from '../../_utils/SVGIcon.server'
import useChatToggle from '@/app/_store/live/useChatToggle'

export default function PlayerHeader() {

  const { isFold, toggle } = useChatToggle();

  const ChattingControl:HeaderItemButtonProps = {
    fnName:"채팅 토글",
    iconName:"ChatFold",
    onClick: () => toggle(),
  }

  return (
    <div className='absolute left-0 right-0 top-0'>
        <div className='flex justify-end gap-[0_40px] p-[15px_15px_0] w-full'>
          <div className='flex flex-col'>
            {/* LIVE BOX */}
            <HeaderInfo/>

            {/* CONTROL BUTTONS */}
            <div className='items-end flex flex-col gap-[10px_0] mt-[20px]'>
              { !isFold && <HeaderItemButton {...ChattingControl}/> }

            </div>
          </div>
      </div>
    </div>
  )
}

function HeaderInfo(){
  return (
      <em className='m-w-[55px] h-[25px] leading-[25px] bg-[#e02020] items-center rounded-[4px] text-white inline-flex text-[12px] font-bold justify-center p-[0_4px] align-top'>
        <SvgIcon name='Live' width={39} height={13}/>
      </em>
  )
}

interface HeaderItemButtonProps {
  fnName?:string
  onClick: () => void;
  iconName: SvgComponentNames;
}

function HeaderItemButton({ onClick, iconName, fnName }:HeaderItemButtonProps){
  return (
    <button aria-label={fnName} onClick={onClick} className='text-[#141517] relative overflow-hidden rounded-[12px] hover:bg-[#ffffff6c]'>
      <SvgIcon name={iconName} width={36} height={36}/>
    </button>
  )
}