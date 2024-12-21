import React from 'react'
import LiveBox from '../../../_ETC/liveBox';
import OpacityAnimation from '../../../../utils/OpacityAnimation.client';
import PlayerHeaderButton, { PlayerHeaderButtonProps } from './PlayerHeaderButton.client';
import useScreenControl from '@/app/_store/live/useScreenControl';

/**
 * 비디오 플레이어 헤더
 */

const Header = () => {
  const {   
    isChatOpen, 
    isWideScreen, 
    isFullscreen, 
    toggleChat, 
    toggleFullscreen, 
    toggleWideScreen 
  } = useScreenControl();

  const ChattingControl:PlayerHeaderButtonProps = {
    fnName:"채팅 토글",
    iconName:"VideoChatFold",
    onClick: () => toggleChat(),
  }

  return (
    <div className='absolute left-0 right-0 top-0'>
        <div className='flex justify-end gap-[0_40px] p-[15px_15px_0] w-full'>
          <div className='flex flex-col'>
            {/* LIVE BOX */}
            <LiveBox/>

            {/* CONTROL BUTTONS */}
            <div className='items-end flex flex-col gap-[10px_0] mt-[20px]'>
              { !isChatOpen && <PlayerHeaderButton {...ChattingControl}/> }
            </div>
          </div>
      </div>
    </div>
  )
}

//애니메이션 적용
const PlayerHeader = OpacityAnimation(Header);
export default PlayerHeader;