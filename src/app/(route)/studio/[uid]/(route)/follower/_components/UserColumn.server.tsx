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
    <tr className="hover:bg-[#f5f6f880]">
      <td className="p-[12px_20px]">
        <Link href={`/channel/${follower.uid}`}>
          <div className="flex gap-[12px] items-center hover:underline">
            <Image
              src={follower.profile_img}
              alt=""
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-[#222] text-[14px] relative -top-[2px] font-semibold">
              {follower.nickname}
            </span>
          </div>
        </Link>
      </td>
      <td className="text-center text-[13px]">{formatDate(created_at)}</td>
      <td className="text-center text-[13px]">{elapsedTime(created_at)}</td>
      <td className="text-center">
        <UserFollowBtn follower={follower} />
      </td>
    </tr>
  );
};

export default UserColumn;
