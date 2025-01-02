'use client';

import React, { useState } from 'react';
import SeacrhIcon from '@public/studioPage/Search.svg';

const SearchArea = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="mt-[40px]">
      <div className="flex gap-[8px]">
        <div
          className={`bg-white border border-[#ddd] p-[9px_14px] inline-flex rounded-[5px] items-center gap-1 w-[250px] h-[40px] ${
            isFocus ? 'border-[#4e41db]' : 'hover:border-[#aaa]'
          }`}
        >
          <SeacrhIcon />
          <input
            placeholder="닉네임을 입력해 주세요."
            type="text"
            autoComplete="off"
            color="#222"
            className="text-[14px] focus:outline-none w-full"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </div>
        <button className="font-blackHanSans bg-[#4e41db26] text-[#4e41db] text-[16px] rounded-[5px] py-[5px] px-[25px]">
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchArea;
