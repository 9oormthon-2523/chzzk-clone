import React from 'react';
import Setting from './_components/Settings/Setting';
import { prefetchUserStreaming } from '@/app/_store/queries/streamingSettings/query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChatLayout from '@/app/(route)/live/[host_uid]/widget/Chat.client';
import StreamingView from './_components/StreamingView.client';

const StudioLivePage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;
  const { queryClient } = await prefetchUserStreaming(uid);

  return (
    <div className="flex w-full h-full">
      <div className="overflow-auto w-[60%] bg-white flex flex-col min-w-[780px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          {/* 스트리밍 재생 페이지로 이동*/}
          <StreamingView uid={uid} />

          {/* 세팅 영역 */}
          <div className="p-[30px] flex flex-col gap-[30px] m-auto">
            <Setting />
          </div>
        </HydrationBoundary>
      </div>

      {/* 채팅 영역 */}
      <ChatLayout roomId={uid} client_uid={uid} />
    </div>
  );
};

export default StudioLivePage;
