import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HeaderButton from './HeaderButton.client';
import ExpandNavButton from './ExpandNavButton.client';
import ProfileButton from './ProfileButton.client';
import { headers } from 'next/headers';
import { use } from 'react';
import { User } from '@supabase/supabase-js';

const Header = ({ uid }: { uid: string }) => {
  const { user } = use(getUserProfile());

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

        <Link href={`/studio/${uid}`}>
          <Image
            src={'/studioPage/StudioText.svg'}
            width={79}
            height={16}
            alt="Logo"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/studio/${uid}/live`} className="h-[40px]">
          <HeaderButton
            imageSrc={'/studioPage/Camera.svg'}
            desc={'방송하기'}
            width={40}
            height={40}
          />
        </Link>
        <ProfileButton uid={uid} user={user} />
      </div>
    </header>
  );
};

export default Header;

const getUserProfile = async (): Promise<{ user: User }> => {
  const header = await headers();
  const response = await fetch('http://localhost:3000/api/auth/user', {
    headers: {
      cookie: header.get('cookie') || '',
    },
  });

  return response.json();
};
