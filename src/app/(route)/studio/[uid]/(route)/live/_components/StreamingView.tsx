'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useUserStreaming } from '@/app/_store/queries/streamingSettings/query';
import { useUID } from '@/app/_store/context/useUid';

const StreamingCoreBtn = dynamic(() => import('./StreamingCoreBtn.client'), {
  ssr: false,
});

const StreamingView = () => {
  const uid = useUID();
  const { data } = useUserStreaming(uid);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-[500px] bg-gray-200 bg-[url('https://ssl.pstatic.net/static/nng/glive-center/resource/p/static/media/player_loading_chzzk.784104a77733493ed42f.gif')] bg-cover bg-center">
      <p className="text-white">
        방송 시작 및 종료는 해당 페이지에서 가능합니다.
      </p>
      <p className="text-white font-bold">
        {
          '라이브 스트리밍을 시작하려면 아래 "스트리밍 시작하기" 버튼을 눌러주세요.'
        }
      </p>
      <div className="mt-[30px]">
        <StreamingCoreBtn />
      </div>
      <div className="absolute bottom-0 w-full bg-[#222] border border-[#FFFFFF1A] font-bold text-[14px] h-[40px] flex justify-center items-center text-white gap-[5px]">
        <div
          className="border-2	border-[#fff] rounded-full w-[12px] h-[12px] relative top-[1px]"
          style={{ backgroundColor: data?.is_active ? '#4CAF50' : '#ddd' }}
        />
        <span>{data?.is_active ? '온라인' : '오프라인'}</span>
      </div>
    </div>
  );
};

export default StreamingView;
