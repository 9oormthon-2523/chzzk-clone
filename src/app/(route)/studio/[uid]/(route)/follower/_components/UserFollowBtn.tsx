'use client';

import { useFollowAction } from '@/app/_hooks/follow';
import { Follower } from '@/app/_types/follow.type';
import React from 'react';

interface Props {
  follower: Follower;
}

const UserFollowBtn = (props: Props) => {
  const { follower } = props;
  const { follow, unfollow } = useFollowAction();

  if (follower.is_following_user) {
    return (
      <button
        className="font-blackHanSans bg-[#fff] text-[#697183] text-[15px] rounded-[5px] py-[4px] px-[15px] border border-[#ddd]"
        onClick={() =>
          unfollow({ uid: follower.uid, nickname: follower.nickname })
        }
      >
        팔로잉
      </button>
    );
  }

  return (
    <button
      className="font-blackHanSans bg-[#4e41db26] text-[#4e41db] text-[15px] rounded-[5px] py-[4px] px-[15px]"
      onClick={() => follow({ uid: follower.uid, nickname: follower.nickname })}
    >
      팔로우
    </button>
  );
};

export default UserFollowBtn;
