"use client";
import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../_hooks/useChat";

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </div>
  );
}
