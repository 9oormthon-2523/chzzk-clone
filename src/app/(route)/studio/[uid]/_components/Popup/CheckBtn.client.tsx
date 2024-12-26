'use client';

import Link from 'next/link';
import React from 'react';

const CheckBtn = () => {
  return (
    <Link href={'/'}>
      <button
        type="button"
        className="bg-[#4e41db] text-white rounded-[7px] text-[16px] font-blackHanSans w-full h-[46px]"
        onClick={() => {
          // 메인페이지에서 로그인 모달을 켜는 hook 연결
        }}
      >
        확인
      </button>
    </Link>
  );
};

export default CheckBtn;
