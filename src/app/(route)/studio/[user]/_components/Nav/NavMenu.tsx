'use client';

import React, { ReactNode, useState } from 'react';
import MenuButtonBox from '../MenuButtonBox.client';
import ArrowDownIcon from '@public/studioPage/ArrowDown.svg';
import ArrowUpIcon from '@public/studioPage/ArrowUp.svg';
import NavDeptIcon from '@public/studioPage/NavDept.svg';
import { useRouter } from 'next/navigation';

interface MenuType {
  text: string;
  route: string;
}
const menus: Record<string, MenuType[]> = {
  대시보드: [],
  '방송 관리': [
    { text: '방송하기', route: 'studio/1/live' },
    { text: '설정', route: 'studio/1/settings' },
    { text: '알림', route: 'studio/1/notice' },
    { text: '리허설 방송 하기', route: 'studio/1/rehearsal' },
  ],
  '시청자 관리': [
    { text: '팔로워', route: 'studio/1/follower' },
    { text: '구독자', route: 'studio/1/subscriber' },
    { text: '활동 제한', route: 'studio/1/blocklist' },
  ],
};

interface Props {
  text: string;
  hideMenu: boolean;
  icon: ReactNode;
  menuRoute: string;
}

const NavMenu = (props: Props) => {
  const { text, hideMenu, icon, menuRoute } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <li className="flex items-center py-[1px] px-[10px] box-border font-blackHanSans text-[15px]">
        <MenuButtonBox
          icon={icon}
          text={text}
          menuRoute={menuRoute}
          px={15}
          py={10}
          gap={10}
          onClick={() => setIsOpen((prev) => !prev)}
        />

        <button
          className="absolute right-[25px]"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {hideMenu && (isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />)}
        </button>
      </li>

      {hideMenu && isOpen && (
        <div className="font-blackHanSans">
          {menus[text].map((item) => (
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
              onClick={() => router.push(item.route)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMenu;
