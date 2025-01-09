import { FollowInfo } from '@/app/_types/follow.type';
import { elapsedTime } from '@/app/_utils/common/elapsedTime';
import { formatDate } from '@/app/_utils/common/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UserFollowBtn from './UserFollowBtn.client';

const UserColumn = (props: FollowInfo) => {
  const { follower, created_at } = props;

  return (
    <div className="follwer-grid-ratio items-center hover:bg-[#f5f6f880] border-t border-[#ddd] py-[12px]">
      {/* 닉네임 및 프로필 */}
      <div className="hover:underline hover:cursor-pointer pl-[20px]">
        <Link
          href={`/channel/${follower.uid}`}
          className="flex gap-[12px] items-center"
        >
          <Image
            src={follower.profile_img}
            alt={`${follower.nickname}의 프로필 이미지`}
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-[#222] text-[14px] relative -top-[2px] font-semibold">
            {follower.nickname}
          </span>
        </Link>
      </div>

      {/* 팔로우 등록일 */}
      <div className="text-center text-[13px] break-all whitespace-normal">
        {formatDate(created_at)}
      </div>

      {/* 기간 */}
      <div className="text-center text-[13px]" suppressHydrationWarning={true}>
        {elapsedTime(created_at)}
      </div>

      {/* 액션 버튼 */}
      <div className="text-center">
        <UserFollowBtn follower={follower} />
      </div>
    </div>
  );
};

export default UserColumn;
