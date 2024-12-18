'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  menuRoute?: string;
}

const MenuButtonBox = ({ icon, text, onClick, menuRoute }: Props) => {
  const [isMatchDomain, setIsMatchDomain] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuRoute && menuRoute === pathname) setIsMatchDomain(true);
  }, [menuRoute, pathname]);

  const colorVariants = {
    on: 'text-[#4e41db]',
    off: 'text-[#525662]',
  };

  return (
    <button
      className={`w-full flex gap-[5px] p-[10px] hover:bg-[#f5f6f8] rounded-[5px] ${
        colorVariants[isMatchDomain ? 'on' : 'off']
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default MenuButtonBox;
