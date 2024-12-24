"use client"
import useScreenControl from "@/app/_store/live/useScreenControl";
import ChatWindow from "../components/Chat/ChatWindow.client"; 
import ChatHeader from "../components/Chat/Header.client"; 
import ChatInput from "../components/Chat/Input.client"; 

/**
 * 채팅 컨테이너 컴포넌트
 */

const ChatLayout = () =>{
    const { isChatOpen, chatPosition, toggleChat } = useScreenControl();

    if (!isChatOpen) return null;
    
    const viewChat_style ={
        width: chatPosition === "side" ? "353px" : "auto",
        flex : chatPosition === "side" ? undefined : "1",
    }

    return(
        <aside id="view-chat" style={viewChat_style} className="bg-white flex relative flex-col min-h-0">
            {/* 채팅 헤더 */}
            <ChatHeader ChatFold={toggleChat}/>
            
            {/* 채팅창 */}
            <ChatWindow/>

            {/* 채팅 입력 */}
            <ChatInput/>
        </aside>
    )
}

export default ChatLayout;