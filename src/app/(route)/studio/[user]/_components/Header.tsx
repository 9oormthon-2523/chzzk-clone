import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import '@/app/_styles/studioPage.css';

interface ButtonProps {
  imageSrc: string;
  desc: string;
  width: number;
  height: number;
  padding?: number;
}

const HeaderButton = ({
  imageSrc,
  desc,
  width,
  height,
  padding,
}: ButtonProps) => {
  return (
    <button
      className="transition-button relative group hover:bg-neutral-700"
      style={{
        padding: `${padding}px`,
      }}
    >
      <Image src={imageSrc} width={width} height={height} alt={desc} />
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

const Header = () => {
  return (
    <header className="bg-[#222] fixed flex justify-between items-center px-[20px] py-[10px] w-full">
      <div className="flex items-center gap-2">
        <HeaderButton
          imageSrc={'/studioPage/Hamburger.svg'}
          desc={'메뉴 확장'}
          width={40}
          height={40}
        />
        <Link href={'/'}>
          <Image
            src={'/studioPage/WhiteLogo.svg'}
            width={74}
            height={26}
            alt="Logo"
          />
        </Link>
        {/* 쿠키에 저장된 토큰값을 사용하여 API를 호출 후 userIdHash 값을 얻어옴 그 후에 아래의 href에 할당*/}
        <Link href={`/studio/donggyun`}>
          <Image
            src={'/studioPage/StudioText.svg'}
            width={79}
            height={16}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href={'/'} className="h-[40px]">
          <HeaderButton
            imageSrc={'/studioPage/Camera.svg'}
            desc={'방송하기'}
            width={40}
            height={40}
          />
        </Link>
        <Link href={'/'} className="h-[40px]">
          <HeaderButton
            imageSrc={'/studioPage/Profile.svg'}
            desc={'내 프로필'}
            width={30}
            height={30}
            padding={5}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
