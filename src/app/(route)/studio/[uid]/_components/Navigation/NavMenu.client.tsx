'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import MenuButtonBox from '../common/MenuButtonBox.client';
import ArrowDownIcon from '@public/studioPage/ArrowDown.svg';
import ArrowUpIcon from '@public/studioPage/ArrowUp.svg';
import NavDeptIcon from '@public/studioPage/NavDept.svg';
import { useRouter } from 'next/navigation';
import useNavSizeToggle from '@/app/_store/studio/useNavSizeToggle.client';
import '@/app/_styles/studioPage.css';

interface MenuType {
  text: string;
  route: string;
}

const uid = '1d8940af-d8ce-43e6-9d59-549f988160ab';

const menus: Record<string, MenuType[]> = {
  대시보드: [],
  '방송 관리': [
    { text: '방송하기', route: `studio/${uid}/live` },
    { text: '설정', route: `studio/${uid}/settings` },
    { text: '알림', route: `studio/${uid}/notice` },
    { text: '리허설 방송 하기', route: `studio/${uid}/rehearsal` },
  ],
  '시청자 관리': [
    { text: '팔로워', route: `studio/${uid}/follower` },
    { text: '구독자', route: `studio/${uid}/subscriber` },
    { text: '활동 제한', route: `studio/${uid}/blocklist` },
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

  const { isFold, toggle } = useNavSizeToggle();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isFold) setIsOpen(false);
  }, [isFold]);

  return (
    <div className="flex flex-col relative group">
      <li className="flex items-center py-[1px] px-[10px] box-border font-blackHanSans text-[15px]">
        <MenuButtonBox
          icon={icon}
          text={text}
          menuRoute={menuRoute}
          px={15}
          py={10}
          gap={10}
          onClick={() => {
            if (isFold) toggle();
            setIsOpen((prev) => !prev);
          }}
        />

        {!isFold && hideMenu && (
          <button
            className="absolute right-[25px]"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        )}
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
              onClick={() => {
                router.push(`/${item.route}`);
              }}
            />
          ))}
        </div>
      )}

      {isFold && (
        <span className="absolute transform top-1/2 -translate-y-1/2 right-1/4 translate-x-full group-button-desc rounded-md hover-opacity">
          {text}
        </span>
      )}
    </div>
  );
};

export default NavMenu;
