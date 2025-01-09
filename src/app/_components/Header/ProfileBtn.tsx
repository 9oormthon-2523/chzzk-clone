"use client";

import React, { useState } from "react";
import { createClient } from "@/app/_utils/supabase/client";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

const ProfileBtn = () => {
  const supabase = createClient();
  const router = useRouter();
  const [isFold, setIsFold] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleGoToChannel = async () => {
    try {
      const {
        data: { user: supabaseUser },
        error: getUserError,
      } = await supabase.auth.getUser();

      if (getUserError) {
        throw new Error(getUserError.message);
      }

      if (supabaseUser) {
        const uid = supabaseUser.id;
        router.push(`/channel/${uid}`);
      } else {
        console.error("사용자 정보가 없습니다.");
      }
    } catch (error) {
      console.error("채널로 이동 오류", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="text-white text-[25px] flex items-center justify-center w-[40px] h-[40px]"
        onClick={() => setIsFold((fold) => !fold)}
      >
        <CgProfile />
      </button>

      {isFold && (
        <div className="flex flex-col absolute top-[50px] right-0">
          <button
            onClick={handleGoToChannel}
            className="text-xs bg-[#333] text-white px-4 py-2 shadow w-auto whitespace-nowrap"
          >
            내 채널
          </button>
          <button
            onClick={handleLogout}
            className="text-xs bg-[#333] text-white px-4 py-2 shadow w-auto whitespace-nowrap"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
