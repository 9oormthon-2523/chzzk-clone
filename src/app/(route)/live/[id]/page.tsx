"use client"

import LiveStreamingLayout from "./components/LiveStreaming/LiveStreaming.client";
import useChatToggle from "@/app/_store/live/useChatToggle";
import ChatLayout from "./components/Chat/_Chat.client";
import { useState } from "react";

export default function Page(){

    //임시 대체 nav state
    const [navFold, setNavFold] = useState<boolean>(false)
    const chatWindow = useChatToggle();

    return (
        <div className="overflow-hidden relative" style={{paddingLeft:`${!navFold ? 78 : 240}px`}}>
            <TemporaryNavWideButton onClickHandler={()=>setNavFold(state => !state)}/>
            <section id="vod-container" className="w-full overflow-y-auto bg-[#f9f9f9] min-w-[950px]">
                <div id="vod-wrapper" className="flex flex-row h-[calc(-60px_+_100vh)]">

                    {/* 라이브 스트리밍 레이아웃 */}
                    <LiveStreamingLayout/>

                    {/* 채팅 레이아웃 */}
                    { chatWindow.isFold && <ChatLayout/> }

                </div>
            </section>
            
        </div>
    )
}

//전역 nav state가 나올때까지 임시버튼
const TemporaryNavWideButton = ({onClickHandler}: {onClickHandler : ()=>void }) => {
    return (
        <div className="bg-[#fff] flex h-[40] w-40 z-[14300] fixed top-0 left-0">
            <header className="flex">
                <button onClick={onClickHandler} className="text-[#2e3033] p-[10px_4px_10px_19px] relative outline-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="header_icon__8SHkt"><g clipPath="url(#clip0_1128_3162)"><rect x="11" y="13" width="18" height="2" rx="1" fill="currentColor"></rect><rect x="11" y="19" width="18" height="2" rx="1" fill="currentColor"></rect><rect x="11" y="25" width="18" height="2" rx="1" fill="currentColor"></rect></g><defs><clipPath id="clip0_1128_3162"><rect width="40" height="40" rx="6" fill="white"></rect></clipPath></defs></svg>
                </button>
            </header>
        </div>
    )
}