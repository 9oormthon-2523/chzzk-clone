'use client';

import React from 'react';
import { useFollowerQuery } from '@/app/_store/queries/follow/query';
import { useUID } from '@/app/_store/context/useUid';
import UserColumn from './UserColumn.server';

const UserTable = () => {
  const uid = useUID();
  const { data } = useFollowerQuery(uid);

  return (
    <div className="mt-[16px] h-auto max-h-[495px] overflow-y-auto scrollbar-thin border-t border-b border-[#ddd] text-[#697183] text-[15px]">
      {/* 헤더 */}
      <div className="follwer-grid-ratio bg-[#f5f6f8] h-[40px] sticky top-0 z-10 border-t border-b border-[#ddd]">
        <div className="th-div">닉네임</div>
        <div className="th-div">팔로우 등록일</div>
        <div className="th-div">기간</div>
        <div className="th-div">액션</div>
      </div>

      {/* 데이터 또는 빈 상태 */}
      {data?.length ? (
        data.map((follower) => <UserColumn key={follower.id} {...follower} />)
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center h-[400px]">
          <span>데이터가 없습니다.</span>
          <button className="bg-[#ddd] font-bold p-[5px_10px] rounded-xl hover:bg-[#bbb]">
            초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
