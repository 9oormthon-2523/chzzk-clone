'use client';

import useStreamingSettings from '@/app/_store/stores/studio/useStreamingSettings';
import React, { useState } from 'react';

const CellTextArea = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { setTitle } = useStreamingSettings();

  return (
    <div
      className={`p-[10px_14px] rounded-[5px] border bg-white w-full ${
        isFocus ? 'border-[#4e41db]' : 'border-[#ddd] hover:border-[#aaa]'
      }`}
    >
      <textarea
        className="resize-none max-h-[460px] min-h-[40px] w-full focus:outline-none text-[14px]"
        placeholder="방송 제목을 입력해주세요."
        maxLength={100}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="text-[#9da5b6] text-[12px] mt-[3px] text-right">
        0/100
      </div>
    </div>
  );
};

export default CellTextArea;
