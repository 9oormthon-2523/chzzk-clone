import { FollowInfo } from '@/app/_types/follow.type';
import { formatDate } from '@/app/_utils/common/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserColumn = (props: FollowInfo) => {
  const { follower, created_at } = props;

  return (
    <tr>
      <td className="p-[12px_20px]">
        <div className="flex gap-[12px] items-center">
          <Image
            src={follower.profile_img}
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
          <Link
            href={`/channel/${follower.uid}`}
            className="text-[#222] text-[15px] relative -top-[2px]"
          >
            {follower.nickname}
          </Link>
        </div>
      </td>
      <td className="text-center text-[13px]">{formatDate(created_at)}</td>
      <td className="text-center text-[13px]">18분</td>
      <td className="text-center">
        <button className="font-blackHanSans bg-[#4e41db26] text-[#4e41db] text-[15px] rounded-[5px] py-[4px] px-[15px]">
          팔로우
        </button>
      </td>
    </tr>
  );
};

export default UserColumn;
