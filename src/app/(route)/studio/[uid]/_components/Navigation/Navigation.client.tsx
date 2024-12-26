'use client';

import React from 'react';
import NavMenu from './NavMenu.client';
import DashboardIcon from '@public/studioPage/Dashboard.svg';
import StudioIcon from '@public/studioPage/Studio.svg';
import ViewerIcon from '@public/studioPage/Viewer.svg';
import Link from 'next/link';
import useNavSizeToggle from '@/app/_store/studio/useNavSizeToggle.client';

const uid = '1d8940af-d8ce-43e6-9d59-549f988160ab';

const Navigation = () => {
  const { isFold } = useNavSizeToggle();

  return (
    <nav
      className="fixed top-[61px] left-0 bottom-0 py-[30px] shadow-base  border-r-[#ddd] bg-white z-40 transition-all duration-200 ease-in-out
"
      style={{
        width: isFold ? '69px' : '240px',
        transitionDelay: isFold ? '200ms' : '0ms',
      }}
    >
      <ul>
        <Link href={`/studio/${uid}`}>
          <NavMenu
            text="대시보드"
            hideMenu={false}
            icon={<DashboardIcon />}
            menuRoute={`/studio/${uid}`}
          />
        </Link>
        <NavMenu
          text="방송 관리"
          hideMenu={true}
          icon={<StudioIcon />}
          menuRoute="/studio/1"
        />
        <NavMenu
          text="시청자 관리"
          hideMenu={true}
          icon={<ViewerIcon />}
          menuRoute="/studio/2"
        />
      </ul>
    </nav>
  );
};

export default Navigation;
