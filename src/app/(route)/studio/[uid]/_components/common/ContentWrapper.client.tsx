'use client';

import React, { ReactNode } from 'react';
import useNavSizeToggle from '@/app/_store/stores/studio/useNavSizeToggle.client';

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  const { isFold } = useNavSizeToggle();

  return (
    <div
      className="flex pt-[61px] bg-[#f1f3f5] transition-all duration-200 ease-in-out h-full"
      style={{
        paddingLeft: isFold ? '69px' : '240px',
      }}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
