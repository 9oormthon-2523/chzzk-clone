"use client";
import useScreenControl from "@/app/_store/live/useScreenControl";
import ChatWindow from "../components/Chat/ChatWindow.client";
import ChatHeader from "../components/Chat/Header.client";
import ChatInput from "../components/Chat/Input.client";
import { useChat } from "@/app/_hooks/useChat";
import { useState } from "react";
/**
 * 채팅 컨테이너 컴포넌트
 */

const ChatLayout = ({ roomId }: { roomId: string }) => {
  const { isChatOpen, chatPosition, toggleChat } = useScreenControl();
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");
  if (!isChatOpen) return null;

  const viewChat_style = {
    width: chatPosition === "side" ? "353px" : "auto",
    flex: chatPosition === "side" ? undefined : "1",
  };
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };
  return (
    <aside
      id="view-chat"
      style={viewChat_style}
      className="bg-white flex relative flex-col min-h-0"
    >
      {/* 채팅 헤더 */}
      <ChatHeader ChatFold={toggleChat} />

      {/* 채팅창 */}
      <ChatWindow messages={messages} />

      {/* 채팅 입력 */}
      <ChatInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </aside>
  );
};

export default ChatLayout;
