import { Message } from "../../_types/chat/Chat";

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.nickname}</strong>: {msg.message}
        </div>
      ))}
    </div>
  );
}
