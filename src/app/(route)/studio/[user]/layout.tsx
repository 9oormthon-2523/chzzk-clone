import React, { ReactNode } from 'react';
import Header from './_components/Header.server';
import Navigation from './_components/Nav/Navigation.server';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex pt-[61px] pl-[240px] bg-[#f1f3f5]">
        <Navigation />
        <section className="overflow-auto">{children}</section>
      </div>
    </div>
  );
};

export default layout;
