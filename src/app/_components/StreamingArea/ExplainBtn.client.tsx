'use client';

import React, { useState } from 'react';

const ExplainBtn = () => {
  const [isOpen, setIsOpen] = useState();
  return (
    <div className="absolute top-8 right-8 flex gap-2 items-center">
      <button className="group relative h-12 w-12 rounded-full bg-white text-2xl hover:bg-zinc-300">
        <span>?</span>
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-[100px] opacity-0 group-hover:opacity-100 transition-opacity bg-[#2e3033] text-white p-2 rounded-lg text-sm font-bold pointer-events-none">
          사용 설명서
        </div>
      </button>
    </div>
  );
};

export default ExplainBtn;
