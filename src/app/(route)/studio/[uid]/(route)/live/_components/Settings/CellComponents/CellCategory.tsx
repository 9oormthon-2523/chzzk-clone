'use client';

import React, { useState } from 'react';
import SeacrhIcon from '@public/studioPage/Search.svg';
import useStreamingSettings from '@/app/_store/stores/studio/useStreamingSettings';

const CellCategory = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { data, setCategory } = useStreamingSettings();

  return (
    <div
      className={`bg-white border p-[9px_14px] inline-flex rounded-[5px] items-center gap-1 w-full h-[40px] ${
        isFocus ? 'border-[#4e41db]' : 'border-[#ddd] hover:border-[#aaa]'
      }`}
    >
      <SeacrhIcon />
      <input
        placeholder="카테고리 입력"
        type="text"
        autoComplete="off"
        color="#222"
        className="text-[14px] focus:outline-none w-full"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => setCategory(e.target.value)}
        value={data.category}
      />
    </div>
  );
};

export default CellCategory;
