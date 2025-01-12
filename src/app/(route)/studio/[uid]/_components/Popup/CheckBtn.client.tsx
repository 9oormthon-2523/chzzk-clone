'use client';

import Link from 'next/link';
import React from 'react';
import useLoginModalToggle from '@/app/_store/modal/useLoginModalToggle.cliet';

const CheckBtn = () => {
  const { toggle } = useLoginModalToggle();
  return (
    <Link href={'/'}>
      <button
        type="button"
        className="bg-[#4e41db] text-white rounded-[7px] text-[16px] font-blackHanSans w-full h-[46px]"
        onClick={toggle}
      >
        확인
      </button>
    </Link>
  );
};

export default CheckBtn;
