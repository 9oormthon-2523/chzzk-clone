import Image from 'next/image';
import MenuButtonBox from '../common/MenuButtonBox.client';
import Link from 'next/link';
import MiniChzzk from '@public/studioPage/MiniChzzk.svg';
import MyChannel from '@public/studioPage/MyChannel.svg';
import Logout from '@public/studioPage/Logout.svg';
import { ProfileProps } from './ProfileButton.client';

const ProfileMenuList = (props: ProfileProps) => {
  const { uid, user } = props;

  return (
    <div className="absolute flex flex-col font-blackHanSans w-[240px] bg-white shadow-base rounded-[5px] border border-solid border-[#dddddd] -translate-x-[198px] font-thin">
      <div className="flex flex-col items-center px-[17px] py-[19px] gap-[11px]">
        <Image
          src={user.user_metadata.avatar_url}
          width={62}
          height={62}
          alt="profile"
          className="border border-solid border-[#dddddd] box-border rounded-full aspect-square"
        />
        <strong className="text-[#222] text-[16px] leading-[17px]">
          {user.user_metadata.full_name}
        </strong>
      </div>
      <div className="flex flex-col border border-solid border-[#ebedf3] text-[13px] px-[6px] py-[7px]">
        <Link href={`/channel/${uid}`}>
          <MenuButtonBox icon={<MyChannel />} text="내 채널" color="gray" />
        </Link>
        <Link href={'/'}>
          <MenuButtonBox
            icon={<MiniChzzk />}
            text="치지직 돌아가기"
            color="gray"
          />
        </Link>
        <MenuButtonBox
          icon={<Logout />}
          text="로그아웃"
          color="gray"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ProfileMenuList;
