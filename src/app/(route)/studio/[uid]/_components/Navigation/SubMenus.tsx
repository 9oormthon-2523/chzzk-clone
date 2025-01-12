'use client';

import React from 'react';
import MenuButtonBox from '../common/MenuButtonBox.client';
import NavDeptIcon from '@public/studioPage/NavDept.svg';
import { useRouter } from 'next/navigation';
import { getMenuList } from '@/app/_utils/studio/getMenuList';
import { useUID } from '@/app/_store/context/useUid';

const SubMenu = ({ menuName }: { menuName: string }) => {
  const router = useRouter();
  const uid = useUID();
  const menuList = getMenuList(uid);

  return (
    <div className="font-blackHanSans">
      {menuList[menuName].map((item) => (
        <MenuButtonBox
          key={item.text}
          icon={
            <div className="relative -top-[2px]">
              <NavDeptIcon />
            </div>
          }
          text={item.text}
          menuRoute={item.route}
          color="gray"
          px={48}
          py={13}
          gap={6}
          fontSize={14}
          onClick={() => {
            if (item.isImplement) router.push(item.route);
            else alert('추후에 구현 예정입니다.');
          }}
        />
      ))}
    </div>
  );
};

export default SubMenu;
