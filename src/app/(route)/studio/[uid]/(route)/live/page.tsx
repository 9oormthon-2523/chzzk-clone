import React from 'react';
import StreamingBtn from './_components/StreamingBtn.client';

const StudioLivePage = () => {

  return (
    <div className="flex w-full h-full">
      {/* 스트리밍 세팅 영역 */}
      <div className="w-[60%] bg-white flex flex-col overflow-hidden">
        <div className="relative flex flex-col justify-center items-center h-[500px] bg-gray-200 bg-[url('https://ssl.pstatic.net/static/nng/glive-center/resource/p/static/media/player_loading_chzzk.784104a77733493ed42f.gif')] bg-cover bg-center">
          <p className="text-white">
            방송 시작 및 종료는 스트리밍 소프트웨어에서 가능합니다.
          </p>
          <p className="text-white font-bold">
            라이브 스트리밍을 시작하려면 스트리밍 소프트웨어를 연결하세요.
          </p>
          <div className="mt-[30px]">
            <StreamingBtn />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-[30px]">settings</div>
      </div>

      {/* 채팅 영역 */}
      <div className="w-[25%] bg-slate-200 overflow-auto h-full m-[0_auto]">
        chat layout
      </div>
    </div>
  );
};

export default StudioLivePage;
