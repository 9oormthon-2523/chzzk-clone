import React from 'react';
import StudioWrapper from '../../_components/common/StudioWrapper.server';
import CountAreaBox from './_components/CountArea.client';
import SearchArea from './_components/SearchArea.client';
import UserTable from './_components/UserTable.client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { prefetchFollower } from '@/app/_store/queries/follow/query';

const StudioFollowerPage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;
  const { queryClient } = await prefetchFollower(uid);

  return (
    <StudioWrapper>
      <div className="flex flex-col w-full">
        <span className="font-blackHanSans text-[23px]">팔로워</span>
        <div className="w-full mt-[16px] p-[29px] shadow-base bg-white rounded-[10px]">
          <div className="py-[21px] px-[29px] rounded-[10px] shadow-base border border-solid border-[#ddd]">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <CountAreaBox />
              <SearchArea />
              <UserTable />
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </StudioWrapper>
  );
};

export default StudioFollowerPage;
