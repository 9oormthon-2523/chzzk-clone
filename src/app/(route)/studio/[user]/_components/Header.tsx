import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#222] fixed flex justify-between items-center px-[20px] py-[10px] w-full">
      <div className="flex items-center gap-2">
        <button>
          <Image
            src={'/studioPage/Hamburger.svg'}
            width={40}
            height={40}
            alt="Logo"
          />
        </button>
        <Link href={'/'}>
          <Image
            src={'/studioPage/WhiteLogo.svg'}
            width={74}
            height={26}
            alt="Logo"
          />
        </Link>
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
        <Link href={'/'}>
          <Image
            src={'/studioPage/Camera.svg'}
            width={40}
            height={40}
            alt="go live"
          />
        </Link>
        <Link href={'/'}>
          <Image
            src={'/studioPage/Profile.svg'}
            width={30}
            height={30}
            alt="Profile"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
