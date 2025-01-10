"use client";
import { Message } from "@/app/_types/chat/Chat";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getColorFromNickname } from "@/app/_utils/chat/hashColor";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
/**
 * 채팅 창
 */

//프롭스는 나중에
type MessageListProps = {
  messages: Message[];
  roomId: string;
};

const ChatWindow = ({ messages, roomId }: MessageListProps) => {
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
              roomId={roomId}
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
  roomId: string;
};
//채팅 박스
const ChatBox = ({ nickname, message, id, roomId }: ChatProps) => {
  const router = useRouter();
  const handleNicknameClick = () => {
    router.push(`/channel/${id}`);
  };

  const nicknameColor = getColorFromNickname(nickname);
  const isBroadcaster = id === roomId;
  return (
    <div aria-label="chat w-full">
      <div className="px-[6px] py-[4px] text-left flex">
        <button
          className={`mr-[4px] leading-[18px] m-[-2px_0] p-[2px_4px_2px_2px] relative border-2 flex items-center ${
            isBroadcaster ? "text-[#3a4338] font-bold" : `${nicknameColor}`
          }`}
          onClick={handleNicknameClick}
        >
          {isBroadcaster && (
            <span className={`font-bold text-[#1bb373] mr-1 text-xl`}>
              <IoShieldCheckmarkSharp />
            </span>
          )}
          {nickname}
        </button>

        <span className="text-[#2e3033] text-left break-words leading-[20px]">
          {message}
        </span>
      </div>
    </div>
  );
};
