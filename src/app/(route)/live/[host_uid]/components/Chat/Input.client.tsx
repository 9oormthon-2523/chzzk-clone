import React from "react";
import SvgIcon from "../../../../../_components/SVGIcon.server";

/**
 * 채팅 입력란
 */
type MessageInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
};

const ChatInput = ({ value, onChange, onSend }: MessageInputProps) => {
  return (
    <div
      id="live-chatting-area"
      className="flex-none p-[10px_20px] relative z-[100]"
    >
      <div className="items-center bg-[#f5f5f5] rounded-[8px] flex p-[5px] relative w-full">
        <button className="items-center flex-none h-[30px] relative w-[30px]">
          <i className="bg-[#0000001a] rounded-[5px] text-[#2e3033] inline-block h-[24px] p-[2px] align-top w-[24px]">
            <SvgIcon name="ChatSetting" width={20} height={20} />
          </i>
        </button>
        <textarea
          aria-label="채팅 입력"
          className="!h-[40px] m-[-10px_0_-10px_4px] p-[10px_0] bg-transparent border-[0px] text-[#2e3033] max-h-[60px] min-h-[20px] outline-none overflow-y-auto relative resize-none whitespace-normal w-full"
          value={value}
          onChange={onChange}
          placeholder="채팅을 입력해주세요"
        />
      </div>

      <div className="items-center flex mt-[10px] p-[2px_0] relative">
        <button
          type="button"
          className="bg-[#f5f5f5] rounded-[8px] flex-none text-[13px] h-[28px] ml-auto p-[0_9px]"
          onClick={onSend}
        >
          채팅
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
