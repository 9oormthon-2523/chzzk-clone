"use client";

import useScreenControl from "@/app/_store/stores/live/useScreenControl";
import ChatWindow from "../components/Chat/ChatWindow.client";
import ChatHeader from "../components/Chat/Header.client";
import ChatInput from "../components/Chat/Input.client";
import { useChat } from "@/app/_hooks/useChat";
import { CSSProperties, useState } from "react";

interface ChatLayoutProps {
  host_uid: string
  uid:string | undefined
}

const ChatLayout = (props: ChatLayoutProps) => {
  const { host_uid, uid } = props
  const { isChatOpen, chatPosition, toggleChat } = useScreenControl();
  const { messages, sendMessage } = useChat(host_uid);
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
        uid={uid}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </aside>
  );
};

export default ChatLayout;
