import React from 'react';
import NavMenu from './NavMenu';
import DashboardIcon from '@public/studioPage/Dashboard.svg';
import StudioIcon from '@public/studioPage/Studio.svg';
import ViewerIcon from '@public/studioPage/Viewer.svg';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="fixed top-[61px] left-0 bottom-0 py-[30px] shadow-base w-[240px] border-r-[#ddd] bg-white">
      <ul>
        <Link href={'/studio/10'}>
          <NavMenu
            text="대시보드"
            hideMenu={false}
            icon={<DashboardIcon />}
            menuRoute="/studio/10"
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
