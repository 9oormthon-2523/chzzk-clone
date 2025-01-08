'use client';

import React, { useState } from 'react';
import SeacrhIcon from '@public/studioPage/Search.svg';

const CellTags = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-[10px] w-full">
        <div
          className={`bg-white border p-[9px_14px] inline-flex rounded-[5px] items-center gap-1 w-full h-[40px] ${
            isFocus ? 'border-[#4e41db]' : 'border-[#ddd] hover:border-[#aaa]'
          }`}
        >
          <SeacrhIcon />
          <input
            placeholder="태그 입력 후 Enter 또는 추가 버튼을 클릭해주세요."
            type="text"
            autoComplete="off"
            color="#222"
            className="text-[14px] focus:outline-none w-full"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </div>
        <button className="bg-[#4e41db1a] text-[#4e41db4d] min-w-[64px] h-[40px] text-[13px] font-extrabold rounded-[7px]">
          추가
        </button>
      </div>

      <ul className="text-[#697183] text-[13px] list-disc	ml-[20px] mt-[10px]">
        <li>공백 및 특수 문자 없이 15자까지 입력할 수 있습니다.</li>
        <li>등록한 순서대로 방송 정보에 노출됩니다.</li>
      </ul>
    </div>
  );
};

export default CellTags;
