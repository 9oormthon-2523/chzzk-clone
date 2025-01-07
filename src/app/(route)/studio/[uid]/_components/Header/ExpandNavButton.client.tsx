'use client';

import React from 'react';
import HeaderButton from './HeaderButton.client';
import useNavSizeToggle from '@/app/_store/stores/studio/useNavSizeToggle.client';

const ExpandNavButton = () => {
  const { isFold, toggle } = useNavSizeToggle();

  return (
    <HeaderButton
      imageSrc={'/studioPage/Hamburger.svg'}
      desc={isFold ? '메뉴 확장' : '메뉴 접기'}
      width={40}
      height={40}
      onClick={toggle}
    />
  );
};

export default ExpandNavButton;
