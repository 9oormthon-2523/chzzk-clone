'use client';

import React from 'react';
import NavMenu from './NavMenu.client';
import DashboardIcon from '@public/studioPage/Dashboard.svg';
import StudioIcon from '@public/studioPage/Studio.svg';
import ViewerIcon from '@public/studioPage/Viewer.svg';
import useNavSizeToggle from '@/app/_store/stores/studio/useNavSizeToggle.client';
import { useUID } from '@/app/_store/context/useUid';

const Navigation = () => {
  const uid = useUID();
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
        <NavMenu
          menuName="대시보드"
          icon={<DashboardIcon />}
          menuRoute={`/studio/${uid}`}
        />
        <NavMenu menuName="방송 관리" icon={<StudioIcon />} />
        <NavMenu menuName="시청자 관리" icon={<ViewerIcon />} />
      </ul>
    </nav>
  );
};

export default Navigation;
