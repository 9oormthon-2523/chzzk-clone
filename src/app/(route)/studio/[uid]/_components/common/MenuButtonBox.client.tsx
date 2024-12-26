'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useNavSizeToggle from '@/app/_store/studio/useNavSizeToggle.client';

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

  const { isFold } = useNavSizeToggle();
  const [isMatchDomain, setIsMatchDomain] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuRoute && menuRoute === pathname) setIsMatchDomain(true);
    else setIsMatchDomain(false);
  }, [menuRoute, pathname]);

  return (
    <button
      className={`w-full flex p-[10px] hover:bg-[#f5f6f8] rounded-[5px] items-center`}
      style={{
        padding: `${py}px ${px}px`,
        color: `${
          isMatchDomain ? '#4e41db' : menuRoute ? '#222222' : '#525662'
        }`,
        fontSize: `${fontSize}px`,
      }}
      onClick={onClick}
    >
      {icon}
      <span
        className="flex transition-all duration-200 ease-in-out whitespace-nowrap overflow-hidden"
        style={{
          opacity: isFold ? '0' : '1',
          marginLeft: isFold ? '0px' : `${gap}px`,
          width: isFold ? '0px' : `137px`,
        }}
      >
        {text}
      </span>
    </button>
  );
};

export default MenuButtonBox;
