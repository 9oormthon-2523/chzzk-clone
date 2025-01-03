import React from 'react';
import UserColumn from './UserColumn';
import { FollowInfo } from '@/app/_types/follow.type';

interface Props {
  followers: FollowInfo[];
}

const UserTable = ({ followers }: Props) => {
  return (
    <table className="text-[#697183] border-t border-t-[#ddd] border-b border-b-[#ddd] text-[15px] mt-[16px] table-fixed">
      <colgroup className="font-blackHanSans">
        <col />
        <col className="w-[14.423%] min-w-[82px]" />
        <col className="w-[14.423%]" />
        <col className="w-[16.3461%]" />
      </colgroup>
      <thead className="bg-[#f5f6f880] border-b-[#ddd] h-[40px]">
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
      </tbody>
    </table>
  );
};

export default UserTable;
