'use client';

import '@/app/_styles/studioPage.css';
import Image from 'next/image';

interface ButtonProps {
  id?: string;
  imageSrc: string;
  desc: string;
  width: number;
  height: number;
  padding?: number;
  onClick?: () => void;
}

const HeaderButton = ({
  id,
  imageSrc,
  desc,
  width,
  height,
  padding,
  onClick,
}: ButtonProps) => {
  return (
    <button
      id={id}
      className="transition-button relative group hover:bg-neutral-700"
      style={{
        padding: `${padding}px`,
      }}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        width={width}
        height={height}
        alt={desc}
        className="rounded-full aspect-square"
      />
      <span
        className="absolute-center group-button-desc transition-button hover-opacity"
        style={{
          marginTop: `${(padding || 0) + 2}px`,
        }}
      >
        {desc}
      </span>
    </button>
  );
};

export default HeaderButton;
