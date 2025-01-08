// ChatLayout.tsx
"use client";

import useScreenControl from "@/app/_store/live/useScreenControl";
import ChatWindow from "../components/Chat/ChatWindow.client";
import ChatHeader from "../components/Chat/Header.client";
import ChatInput from "../components/Chat/Input.client";
import { useChat } from "@/app/_hooks/useChat";
import { CSSProperties, useState } from "react";

const ChatLayout = ({ roomId }: { roomId: string }) => {
  const { isChatOpen, chatPosition, toggleChat } = useScreenControl();
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  if (!isChatOpen) return null;

  const viewChatStyle: CSSProperties = {
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
      style={viewChatStyle}
      className="bg-white flex relative flex-col min-h-0"
    >
      <ChatHeader ChatFold={toggleChat} />
      <ChatWindow messages={messages} />
      <ChatInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </aside>
  );
};

export default ChatLayout;
