import React from 'react';
import UserColumn from './UserColumn.server';
import { FollowInfo } from '@/app/_types/follow.type';

interface Props {
  followers: FollowInfo[];
}

const UserTable = ({ followers }: Props) => {
  return (
    <table className="block text-[#697183] border-t border-t-[#ddd] border-b border-b-[#ddd] text-[15px] mt-[16px] table-fixed overflow-y-auto h-[495px] w-full border-separate border-spacing-0 scrollbar-thin">
      <colgroup className="font-blackHanSans">
        <col />
        <col className="w-[14.5%] min-w-[82px]" />
        <col className="w-[14.5%]" />
        <col className="w-[16.5%] min-w-[75px]" />
      </colgroup>
      <thead className="bg-[#f5f6f8] h-[40px] sticky top-0 z-10">
        <tr>
          <th scope="col">닉네임</th>
          <th scope="col">팔로우 등록일</th>
          <th scope="col">기간</th>
          <th scope="col">액션</th>
        </tr>
      </thead>
      <tbody>
        {followers.map((follower) => (
          <UserColumn key={follower.id} {...follower} />
        ))}
        {followers.map((follower) => (
          <UserColumn key={follower.id} {...follower} />
        ))}
        {followers.map((follower) => (
          <UserColumn key={follower.id} {...follower} />
        ))}
        {followers.map((follower) => (
          <UserColumn key={follower.id} {...follower} />
        ))}
        {followers.map((follower) => (
          <UserColumn key={follower.id} {...follower} />
        ))}
        {followers.map((follower) => (
          <UserColumn key={follower.id} {...follower} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
