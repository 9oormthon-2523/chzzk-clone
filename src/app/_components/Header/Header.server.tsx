import Image from "next/image";
import Link from "next/link";
import React from "react";
import ExpandNavButton from "./ExpandNavButton.client";
import ProfileButton from "./ProfileButton.client";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import LoginButton from "./LoginButton";
const Header = () => {
  const { toggle } = useNavToggle();
  return (
    <header className="bg-[#222] fixed flex justify-between items-center px-[20px] py-[10px] w-full z-40 ">
      <div className="flex items-center gap-2">
        <ExpandNavButton />
        <Link href={"/"}>
          <Image
            src={"/studioPage/WhiteLogo.svg"}
            width={74}
            height={26}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {/* <ProfileButton /> */}
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;
