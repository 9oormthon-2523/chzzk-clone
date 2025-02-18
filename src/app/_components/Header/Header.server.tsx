"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ExpandNavButton from "./ExpandNavButton.client";
import LoginButton from "./LoginButton.client";
import ProfileBtn from "./ProfileBtn";
import { createClient } from "@/app/_utils/supabase/client";
import LoginModal from "../LoginModal/LoginModal.client";
const Header = () => {
  const supabase = createClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [supabase]);

  return (
    <header className="bg-[#222] fixed flex justify-between items-center px-[10px] py-[10px] w-full z-40 ">
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
        {isLoggedIn ? <ProfileBtn /> : <LoginButton />}
        <LoginModal />
      </div>
    </header>
  );
};

export default Header;
