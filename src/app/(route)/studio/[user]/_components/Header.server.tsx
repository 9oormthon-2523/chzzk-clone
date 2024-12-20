import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HeaderButton from './HeaderButton.client';
import ExpandNavButton from './ExpandNavButton.client';
import ProfileButton from './ProfileButton.client';

const Header = () => {
  return (
    <header className="bg-[#222] fixed top-0 right-0 flex justify-between items-center px-[20px] py-[10px] w-full z-50">
      <div className="flex items-center gap-2">
        <ExpandNavButton />
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
        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
