import React from 'react';
import CheckBtn from './CheckBtn.client';
import Link from 'next/link';
import CloseIcon from '@public/studioPage/Close.svg';

const Popup = () => {
  return (
    <div className="flex justify-center items-center bg-[#000000b3] w-screen h-screen fixed">
      <div className="flex flex-col w-[370px] bg-white text-[#222] rounded-[10px] shadow-base relative">
        <span className="flex justify-center border-b border-[#ebedf3] py-[18px] px-[70px] font-blackHanSans text-[18px] w-full">
          안내
        </span>
        <div className="flex justify-center pt-[25px] px-[30px] pb-[10px] w-full">
          <p className="text-[14px] font-medium">로그인이 필요합니다.</p>
        </div>
        <div className="p-[20px]">
          <div className="px-[10px]">
            <CheckBtn />
          </div>
        </div>
        <Link href={'/'}>
          <button
            type="button"
            className="group px-[20px] py-[14px] absolute right-0 top-0 outline-none"
          >
            <CloseIcon className="group-hover:bg-[#f5f6f8] rounded-[4px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Popup;
