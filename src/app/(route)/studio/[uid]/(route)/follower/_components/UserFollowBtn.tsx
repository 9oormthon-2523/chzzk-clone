'use client';

import React from 'react';

interface Props {
  isFollowingUser: boolean;
}

const UserFollowBtn = (props: Props) => {
  const { isFollowingUser } = props;

  if (isFollowingUser) {
    return (
      <button
        className="font-blackHanSans bg-[#fff] text-[#697183] text-[15px] rounded-[5px] py-[4px] px-[15px] border border-[#ddd]"
        onClick={() => {}}
      >
        팔로잉
      </button>
    );
  }

  return (
    <button
      className="font-blackHanSans bg-[#4e41db26] text-[#4e41db] text-[15px] rounded-[5px] py-[4px] px-[15px]"
      onClick={() => {}}
    >
      팔로우
    </button>
  );
};

export default UserFollowBtn;
