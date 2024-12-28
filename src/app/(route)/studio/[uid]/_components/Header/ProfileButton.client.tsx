'use client';

import React, { useState } from 'react';
import HeaderButton from './HeaderButton.client';
import ProfileMenuList from './ProfileMenu.server';
import OutsideClickDetector from '@/app/_components/OutsideClickWrapper.client';

const ProfileButton = ({ uid }: { uid: string }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="relative">
      <HeaderButton
        imageSrc={'/studioPage/Profile.svg'}
        desc={'내 프로필'}
        width={30}
        height={30}
        padding={5}
        onClick={() => setIsOpenMenu((prev) => !prev)}
      />

      {isOpenMenu && (
        <OutsideClickDetector action={() => setIsOpenMenu(false)}>
          <ProfileMenuList uid={uid} />
        </OutsideClickDetector>
      )}
    </div>
  );
};

export default ProfileButton;
