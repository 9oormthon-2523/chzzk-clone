import React from 'react'
import LiveBox from '../../liveBox';
import useChatToggle from '@/app/_store/live/useChatToggle'
import OpacityAnimation from '../../../utils/OpacityAnimation.client';
import SvgIcon, { SvgComponentNames } from '../../../../../../_components/SVGIcon.server'

function Header() {

  const { isFold, toggle } = useChatToggle();

  const ChattingControl:HeaderItemButtonProps = {
    fnName:"채팅 토글",
    iconName:"VideoChatFold",
    onClick: () => toggle(),
  }

  return (
    <div className='absolute left-0 right-0 top-0'>
        <div className='flex justify-end gap-[0_40px] p-[15px_15px_0] w-full'>
          <div className='flex flex-col'>
            {/* LIVE BOX */}
            <LiveBox/>

            {/* CONTROL BUTTONS */}
            <div className='items-end flex flex-col gap-[10px_0] mt-[20px]'>
              { !isFold && <HeaderItemButton {...ChattingControl}/> }

            </div>
          </div>
      </div>
    </div>
  )
}

//애니메이션 적용
const PlayerHeader = OpacityAnimation(Header);
export default PlayerHeader;



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