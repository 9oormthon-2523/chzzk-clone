"use client";

import React, { useState } from "react";
import { createClient } from "@/app/_utils/supabase/client";
import { CgProfile } from "react-icons/cg";
const ProfileBtn = () => {
  const supabase = createClient();
  const [isFold, setIsFold] = useState(false);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        className="text-white text-[25px] flex items-center justify-center w-[40px] h-[40px] "
        onClick={() => setIsFold((fold) => !fold)}
      >
        <CgProfile />
      </button>
      {isFold && (
        <button
          onClick={handleLogout}
          className="absolute right-0 mt-2 text-xs bg-[#333] text-white px-4 py-2 rounded shadow w-auto whitespace-nowrap"
        >
          로그아웃
        </button>
      )}
    </div>
  );
};

export default ProfileBtn;
