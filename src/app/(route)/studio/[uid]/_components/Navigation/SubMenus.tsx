'use client';

import React from 'react';
import MenuButtonBox from '../common/MenuButtonBox.client';
import NavDeptIcon from '@public/studioPage/NavDept.svg';
import { useRouter } from 'next/navigation';

interface MenuType {
  text: string;
  route: string;
  isImplement: boolean;
}

const uid = '1d8940af-d8ce-43e6-9d59-549f988160ab';
const menuList: Record<string, MenuType[]> = {
  대시보드: [],
  '방송 관리': [
    { text: '방송하기', route: `studio/${uid}/live`, isImplement: true },
    { text: '설정', route: `studio/${uid}/settings`, isImplement: false },
    { text: '알림', route: `studio/${uid}/notice`, isImplement: false },
    {
      text: '리허설 방송 하기',
      route: `studio/${uid}/rehearsal`,
      isImplement: false,
    },
  ],
  '시청자 관리': [
    { text: '팔로워', route: `studio/${uid}/follower`, isImplement: true },
    { text: '구독자', route: `studio/${uid}/subscriber`, isImplement: false },
    { text: '활동 제한', route: `studio/${uid}/blocklist`, isImplement: false },
  ],
};

const SubMenu = ({ menuName }: { menuName: string }) => {
  const router = useRouter();

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
          px={48}
          py={13}
          gap={6}
          fontSize={14}
          onClick={() => {
            if (item.isImplement) router.push(`/${item.route}`);
            else alert('추후에 구현 예정입니다.');
          }}
        />
      ))}
    </div>
  );
};

export default SubMenu;
