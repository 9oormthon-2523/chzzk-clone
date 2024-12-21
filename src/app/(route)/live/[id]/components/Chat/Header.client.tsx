import React, { useEffect } from 'react'
import SvgIcon from '../../../../../_components/SVGIcon.server'

/**
 * 채팅 헤더
 */

interface ChatHeaderProps{
    ChatFold: () => void
}

const ChatHeader = (props: ChatHeaderProps) => {
    const { ChatFold } = props;

    return (
        
        <div id="chatting-header-container" className="h-[44px] relative box-border">
            <h2 className="flex items-center justify-center bg-[#fff] border border-solid border-t-[#0000000f] border-b-[#0000000f] border-l-0 border-r-0 text-[#2e3033] text-[15px] font-normal h-full px-11 relative z-10">
                채팅
            </h2>
            
            <div className=" absolute top-0 z-[100] box-border w-[44px] h-[44px]">
                <button onClick={ChatFold} type="button" aria-label="채팅 접기" className="text-[#666] overflow-hidden p-[8px] w-[inherit] h-[inherit]">
                    <SvgIcon name="ChatFold" width={28} height={28} className="rounded-lg hover:bg-[#58585820] hover:text-black"/>
                </button>
            </div>  

            <div className="right-0 absolute top-0 z-[100] box-border w-[44px] h-[44px]">
                <button type="button" aria-label="채팅 접기" className="text-[#666] overflow-hidden p-[8px] w-[inherit] h-[inherit]">
                    <SvgIcon name="ChatOption" width={20} height={28} className="rounded-lg hover:bg-[#58585820] hover:text-black"/>
                </button>
            </div>  
        </div>
    )
}

export default ChatHeader