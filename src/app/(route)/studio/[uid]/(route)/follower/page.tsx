import React from 'react';
import StudioWrapper from '../../_components/common/StudioWrapper.server';
import CountAreaBox from './_components/CountArea';
import SearchArea from './_components/SearchArea';
import UserTable from './_components/UserTable';

const StudioFollowerPage = () => {
  return (
    <StudioWrapper>
      <div className="flex flex-col w-full">
        <span className="font-blackHanSans text-[23px]">팔로워</span>
        <div className="w-full mt-[16px] p-[29px] shadow-base bg-white rounded-[10px]">
          <div className="py-[21px] px-[29px] rounded-[10px] shadow-base border border-solid border-[#ddd]">
            <CountAreaBox />
            <SearchArea />
            <UserTable />
          </div>
        </div>
      </div>
    </StudioWrapper>
  );
};

export default StudioFollowerPage;
