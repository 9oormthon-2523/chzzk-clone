import { Message } from "@/app/_types/chat/Chat";
/**
 * 채팅 창
 */

//프롭스는 나중에
type MessageListProps = {
  messages: Message[];
};

const ChatWindow = ({ messages }: MessageListProps) => {
  return (
    <div
      id="chatting-list-container"
      className="flex flex-[1_1] overflow-hidden relative"
    >
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex flex-col overflow-y-auto p-[0_12px] w-full"
      >
        {/* 채팅 */}
        <div id="empty-box-forChat" aria-label="빈 박스" />
        <div className="text-[14px]">
          {messages.map((msg, idx) => (
            <ChatBox key={idx} nickname={msg.nickname} message={msg.message} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

type ChatProps = {
  nickname: string;
  message: string;
};
//채팅 박스
const ChatBox = ({ nickname, message }: ChatProps) => {
  return (
    <div aria-label="chat w-full">
      <button className="px-[6px] py-[4px] text-left">
        <span className="mr-[4px] leading-[18px] m-[-2px_0] p-[2px_4px_2px_2px] relative text-green-500">
          {nickname}
        </span>

        <span className="text-[#2e3033] text-left break-words leading-[20px]">
          {message}
        </span>
      </button>
    </div>
  );
};
