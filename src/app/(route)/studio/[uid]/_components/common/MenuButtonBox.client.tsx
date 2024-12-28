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
  color: 'black' | 'gray';
}

const MenuButtonBox = (props: Props) => {
  const { icon, text, onClick, menuRoute, px, py, gap, fontSize, color } =
    props;

  const { isFold } = useNavSizeToggle();
  const [isMatchDomain, setIsMatchDomain] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuRoute && menuRoute === pathname) setIsMatchDomain(true);
    else setIsMatchDomain(false);
  }, [menuRoute, pathname]);

  const fontColor = {
    black: 'text-[#222222]',
    gray: 'text-[#525662]',
  };

  return (
    <button
      className={`w-full flex p-[10px] hover:bg-[#f5f6f8] rounded-[5px] items-center ${fontColor[color]}`}
      style={{
        padding: `${py}px ${px}px`,
        color: `${isMatchDomain && '#4e41db'}`,
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
