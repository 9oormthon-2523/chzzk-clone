import React, { useState } from "react";
import SvgIcon from "@/app/_components/SVGIcon.server";
/**
 * 채팅 입력란
 */


type MessageInputProps = {
  sendMessage: (message: string) => Promise<void>;
  client_uid: string|null;
};

const ChatInput = ({ client_uid, sendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const onPressEnter = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.nativeEvent.isComposing) {
        handleSendMessage();
      }
    }
  }

  const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  }

  return (
    <div
      id="live-chatting-area"
      className="flex-none p-[10px_20px] relative z-[30]"
    >
      <div className="items-center bg-[#f5f5f5] rounded-[8px] flex p-[5px] relative w-full">
        <button aria-label="no-option" className="cursor-not-allowed items-center flex-none h-[30px] relative w-[30px]">
          <i className="bg-[#0000001a] rounded-[5px] text-[#2e3033] inline-block h-[24px] p-[2px] align-top w-[24px]">
            <SvgIcon name="ChatSetting" width={20} height={20} />
          </i>
        </button>
        
        <textarea
          aria-label="채팅 입력"
          disabled={!client_uid}
          value={newMessage}
          onKeyDown={onPressEnter}
          onChange={onChangeHandler}
          placeholder="채팅을 입력해주세요"
          style={{ cursor : client_uid ? undefined : "not-allowed" }}
          className="select-none !h-[40px] m-[-10px_0_-10px_4px] p-[10px_0] bg-transparent border-[0px] text-[#2e3033] max-h-[60px] min-h-[20px] outline-none overflow-y-auto relative resize-none whitespace-normal w-full"
        />
      </div>

      <div className="items-center flex mt-[10px] p-[2px_0] relative">
        <button
          aria-label="send-chat-message"
          onClick={handleSendMessage}
          className="bg-[#f5f5f5] rounded-[8px] flex-none text-[13px] h-[28px] ml-auto p-[0_9px] hover:brightness-90"
        >
          채팅
        </button>
      </div>
    </div>
  );
};

export default ChatInput;