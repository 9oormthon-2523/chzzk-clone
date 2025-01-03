"use client";

import React from 'react';
import Header from "@/app/_components/Header/Header.server";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import useNavToggle from "@/app/_store/main/useNavToggle.client";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const { isOpen } = useNavToggle();

  return (
    <div>
      <Header />
      {isOpen && <NavBar />}
      {children}
    </div>
  );
};

export default RootLayout;
