'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  menuRoute?: string;
  gap?: number;
  px?: number;
  py?: number;
  fontSize?: number;
}

const MenuButtonBox = (props: Props) => {
  const { icon, text, onClick, menuRoute, px, py, gap, fontSize } = props;
  const [isMatchDomain, setIsMatchDomain] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuRoute && menuRoute === pathname) setIsMatchDomain(true);
  }, [menuRoute, pathname]);

  return (
    <button
      className={`w-full flex gap-[5px] p-[10px] hover:bg-[#f5f6f8] rounded-[5px] items-center`}
      style={{
        padding: `${py}px ${px}px`,
        gap: `${gap}px`,
        color: `${
          isMatchDomain ? '#4e41db' : menuRoute ? '#222222' : '#525662'
        }`,
        fontSize: `${fontSize}px`,
      }}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default MenuButtonBox;
