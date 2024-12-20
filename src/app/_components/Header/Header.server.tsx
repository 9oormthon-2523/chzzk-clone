import Image from "next/image";
import Link from "next/link";
import React from "react";
import ExpandNavButton from "./ExpandNavButton.client";
import LoginButton from "./LoginButton.client";
const Header = () => {
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
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;
