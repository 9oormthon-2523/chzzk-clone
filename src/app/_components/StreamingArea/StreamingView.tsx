'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import StreamingStatus from './StreamingStatus';

const StreamingButtonList = dynamic(() => import('./StreamingButtonList.client'), {
  ssr: false,
});

const StreamingView = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-[500px] bg-gray-200 bg-[url('https://ssl.pstatic.net/static/nng/glive-center/resource/p/static/media/player_loading_chzzk.784104a77733493ed42f.gif')] bg-cover bg-center">
      <p className="text-white">방송 시작 및 종료는 해당 페이지에서 가능합니다.</p>
      <p className="text-white font-bold">
        {'라이브 스트리밍을 시작하려면 아래 "스트리밍 시작하기" 버튼을 눌러주세요.'}
      </p>
      <div className="mt-[30px]">
        <StreamingButtonList />
      </div>
      <StreamingStatus />
    </div>
  );
};

export default StreamingView;
