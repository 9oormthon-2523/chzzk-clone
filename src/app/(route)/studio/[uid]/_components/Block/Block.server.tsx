import React from 'react';
import LockIcon from '@public/studioPage/Lock.svg';
import Header from '../Header/Header.server';
import Footer from '../common/Footer';
import Link from 'next/link';

const Block = ({ uid }: { uid: string }) => {
  return (
    <div className="fixed w-full h-full">
      <Header uid={uid} />
      <div className="h-full flex flex-col justify-center items-center gap-7 font-blackHanSans">
        <LockIcon />
        <p className="text-[28px] text-[#222]">
          이 페이지를 이용할 수 있는 권한이 없습니다.
        </p>
        <Link href={'/'}>
          <button className="bg-[#4e41db26] text-[#4e41db] flex items-center text-[18px] rounded-[7px] py-[13px] px-[25px]">
            메인으로 돌아가기
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Block;
