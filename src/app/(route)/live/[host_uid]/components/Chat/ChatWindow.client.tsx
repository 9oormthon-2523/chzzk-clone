"use client";
import { Message } from "@/app/_types/chat/Chat";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getColorFromNickname } from "@/app/_utils/chat/hashColor";

/**
 * 채팅 창
 */

//프롭스는 나중에
type MessageListProps = {
  messages: Message[];
};

const ChatWindow = ({ messages }: MessageListProps) => {
  useEffect(() => {
    console.log("msg:", messages);
  }, [messages]);
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
            <ChatBox
              key={idx}
              nickname={msg.nickname}
              message={msg.message}
              id={msg.id}
            />
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
  id: string;
};
//채팅 박스
const ChatBox = ({ nickname, message, id }: ChatProps) => {
  const router = useRouter();
  const handleNicknameClick = () => {
    router.push(`/channel/${id}`);
  };

  const nicknameColor = getColorFromNickname(nickname);
  return (
    <div aria-label="chat w-full">
      <div className="px-[6px] py-[4px] text-left">
        <button
          className="mr-[4px] leading-[18px] m-[-2px_0] p-[2px_4px_2px_2px] relative text-green-500"
          onClick={handleNicknameClick}
          style={{ color: nicknameColor }}
        >
          {nickname}
        </button>

        <span className="text-[#2e3033] text-left break-words leading-[20px]">
          {message}
        </span>
      </div>
    </div>
  );
};
