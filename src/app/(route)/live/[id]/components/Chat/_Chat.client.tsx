
import ChatWindow from "./ChatWindow.client";
import ChatHeader from "./Header.client";
import ChatInput from "./Input.client";

/**
 * 채팅 컨테이너 컴포넌트
 */

export default function ChatLayout(){

    return(
        <aside id="view-chat" className="w-[353px] bg-white flex relative flex-col">
            {/* 채팅 헤더 */}
            <ChatHeader/>
            
            {/* 채팅창 */}
            <ChatWindow/>

            {/* 채팅 입력 */}
            <ChatInput/>
        </aside>
    )
}