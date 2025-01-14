import Image from 'next/image';
import MenuButtonBox from '../common/MenuButtonBox.client';
import Link from 'next/link';
import MiniChzzk from '@public/studioPage/MiniChzzk.svg';
import MyChannel from '@public/studioPage/MyChannel.svg';
import Logout from '@public/studioPage/Logout.svg';
import { ProfileProps } from './ProfileButton.client';
import { createClient } from '@/app/_utils/supabase/client';
import { useRouter } from 'next/navigation';

const ProfileMenuList = (props: ProfileProps) => {
  const { uid, user } = props;
  const router = useRouter();

  return (
    <div className="absolute flex flex-col font-blackHanSans w-[240px] bg-white shadow-base rounded-[5px] border border-solid border-[#dddddd] -translate-x-[198px] font-thin">
      <div className="flex flex-col items-center px-[17px] py-[19px] gap-[11px]">
        <Image
          src={user.profile_img || '/userImage.webp'}
          width={62}
          height={62}
          alt="profile"
          className="border border-solid border-[#dddddd] box-border rounded-full aspect-square"
        />
        <strong className="text-[#222] text-[16px] leading-[17px]">
          {user.nickname}
        </strong>
      </div>
      <div className="flex flex-col border border-solid border-[#ebedf3] text-[13px] px-[6px] py-[7px]">
        <Link href={`/channel/${uid}`}>
          <MenuButtonBox
            icon={<MyChannel />}
            text="내 채널"
            color="gray"
            gap={5}
          />
        </Link>
        <Link href={'/'}>
          <MenuButtonBox
            icon={<MiniChzzk />}
            text="치지직 돌아가기"
            color="gray"
            gap={5}
          />
        </Link>
        <MenuButtonBox
          icon={<Logout />}
          text="로그아웃"
          color="gray"
          gap={5}
          onClick={async () => {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
            if (!error) router.push('/studio');
          }}
        />
      </div>
    </div>
  );
};

export default ProfileMenuList;
