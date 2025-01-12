'use client';

import React from 'react';
import MyChannelFollowerIcon from '@public/studioPage/MyChannelFollower.svg';
import { useFollowerQuery } from '@/app/_store/queries/follow/query';
import { useUID } from '@/app/_store/context/useUid';

const CountAreaBox = () => {
  const uid = useUID();
  const { data } = useFollowerQuery(uid);

  return (
    <div className="flex gap-[5px] items-center w-full">
      <MyChannelFollowerIcon />
      <div className="flex gap-[9px] items-center">
        <div className="font-blackHanSans text-[17px] leading-none relative top-[2px] text-[#525662]">
          내 채널 팔로워
        </div>
        <span className="text-[15px] text-[#9da5b6] leading-none">/</span>
        <strong className="text-[#4e41db] text-[32px] font-extrabold leading-none">
          {data?.length}
        </strong>
      </div>
    </div>
  );
};

export default CountAreaBox;
