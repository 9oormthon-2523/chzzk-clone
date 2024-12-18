import Image from "next/image";
import MenuButtonBox from "./MenuButtonBox.client";
import Link from "next/link";
import MiniChzzk from "@public/studioPage/MiniChzzk.svg";
import MyChannel from "@public/studioPage/MyChannel.svg";
import Logout from "@public/studioPage/Logout.svg";

const ProfileMenuList = () => {
  return (
    <div className="absolute flex flex-col font-blackHanSans w-[240px] bg-white shadow-base rounded-[5px] border border-solid border-[#dddddd] -translate-x-[198px] font-thin">
      <div className="flex flex-col items-center px-[17px] py-[19px] gap-[11px]">
        <Image
          src={"/studioPage/Profile.svg"}
          width={62}
          height={62}
          alt="profile"
          className="border border-solid border-[#dddddd] box-border rounded-full"
        />
        <strong className="text-[#222] text-[16px] leading-[17px]">
          밤새는 겜돌이
        </strong>
      </div>
      <div className="flex flex-col border border-solid border-[#ebedf3] text-[13px] px-[6px] py-[7px]">
        {/* 유저의 고유 uuid를 동적 라우트로 넣어야함 */}
        <Link href={"/channel"}>
          <MenuButtonBox icon={<MyChannel />} text="내 채널" />
        </Link>
        <Link href={"/"}>
          <MenuButtonBox icon={<MiniChzzk />} text="치지직 돌아가기" />
        </Link>
        <MenuButtonBox icon={<Logout />} text="로그아웃" onClick={() => {}} />
      </div>
    </div>
  );
};

export default ProfileMenuList;
