import React from 'react';
import Setting from './_components/Settings/Setting';
import StreamingView from './_components/StreamingView';

const StudioLivePage = () => {
  return (
    <div className="flex w-full h-full">
      <div className="overflow-auto w-[60%] bg-white flex flex-col min-w-[780px]">
        {/* 스트리밍 화면 영역 */}
        <StreamingView />

        {/* 세팅 영역 */}
        <div className="p-[30px] flex flex-col gap-[30px] m-auto">
          <Setting />
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="w-[40%] bg-slate-200 overflow-auto h-full m-[0_auto]">
        chat layout
      </div>
    </div>
  );
};

export default StudioLivePage;
