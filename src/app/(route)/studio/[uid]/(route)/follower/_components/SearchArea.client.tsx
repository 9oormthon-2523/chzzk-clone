'use client';

import React, { useEffect, useState } from 'react';
import SeacrhIcon from '@public/studioPage/Search.svg';
import useSearchInput from '@/app/_store/stores/studio/useSearchInput';

const SearchArea = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  const { text, setText } = useSearchInput();

  useEffect(() => {
    if (!text) {
      setInputText('');
    }
  }, [text]);

  return (
    <div className="mt-[40px]">
      <form
        className="flex gap-[8px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputText.length) return;
          setText(inputText);
        }}
      >
        <div
          className={`bg-white border  p-[9px_14px] inline-flex rounded-[5px] items-center gap-1 w-[250px] h-[40px] ${
            isFocus ? 'border-[#4e41db]' : 'border-[#ddd] hover:border-[#aaa]'
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
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
        </div>
        <button
          className="font-blackHanSans bg-[#0a0a0c26] text-[#4e41db] text-[16px] rounded-[5px] py-[5px] px-[25px] hover:bg-[#4e41db] hover:text-white disabled:bg-[#0a0a0c26] disabled:text-[#4e41db] disabled:cursor-not-allowed"
          disabled={!inputText}
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchArea;
