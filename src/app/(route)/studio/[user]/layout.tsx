'use client';

import React, { ReactNode } from 'react';
import Header from './_components/Header.server';
import Navigation from './_components/Nav/Navigation.client';
import useNavSizeToggle from '@/app/_store/studio/useNavSizeToggle.client';

const StudioLayout = ({ children }: { children: ReactNode }) => {
  const { isFold } = useNavSizeToggle();
  return (
    <div>
      <Header />
      <div
        className="flex pt-[61px] bg-[#f1f3f5] transition-all duration-200 ease-in-out"
        style={{
          paddingLeft: isFold ? '69px' : '240px',
        }}
      >
        <Navigation />
        <section className="overflow-auto">{children}</section>
      </div>
    </div>
  );
};

export default StudioLayout;
