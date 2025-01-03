import React, { use } from 'react';
import StudioWrapper from '../../_components/common/StudioWrapper.server';
import CountAreaBox from './_components/CountArea';
import SearchArea from './_components/SearchArea';
import UserTable from './_components/UserTable';
import { headers } from 'next/headers';

const StudioFollowerPage = () => {
  const { data } = use(getFollower());
  console.log(data);
  return (
    <StudioWrapper>
      <div className="flex flex-col w-full">
        <span className="font-blackHanSans text-[23px]">팔로워</span>
        <div className="w-full mt-[16px] p-[29px] shadow-base bg-white rounded-[10px]">
          <div className="py-[21px] px-[29px] rounded-[10px] shadow-base border border-solid border-[#ddd]">
            <CountAreaBox totalFollower={data.length} />
            <SearchArea />
            <UserTable />
          </div>
        </div>
      </div>
    </StudioWrapper>
  );
};

export default StudioFollowerPage;

const getFollower = async () => {
  const header = await headers();
  const res = await fetch('http://localhost:3000/api/studio/follow', {
    headers: { cookie: header.get('cookie') || '' },
  });

  return res.json();
};
