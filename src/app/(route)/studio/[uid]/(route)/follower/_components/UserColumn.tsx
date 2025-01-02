import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserColumn = () => {
  return (
    <tr>
      <td className="p-[12px_20px]">
        <div className="flex gap-[12px] items-center">
          <Image
            src="/userImage.webp"
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
          <Link
            href={'/channel/1d8940af-d8ce-43e6-9d59-549f988160ab'}
            className="text-[#222] text-[15px] relative -top-[2px]"
          >
            username
          </Link>
        </div>
      </td>
      <td className="text-center text-[13px]">2025-01-02 16:28:07</td>
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
