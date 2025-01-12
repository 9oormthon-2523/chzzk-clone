"use client";

import React, { useState } from "react";
import { createClient } from "@/app/_utils/supabase/client";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoHeartCircleOutline } from "react-icons/io5";
import { GrChannel } from "react-icons/gr";
import { BsBroadcastPin } from "react-icons/bs";

type ClickHandlers = {
  handleGoToChannel: () => Promise<void>;
  handleLogout: () => Promise<void>;
  handleBroadCast: () => Promise<void>;
  handleGoToFollowChannel: () => Promise<void>;
};

type IconItem = {
  Icon: React.FC;
  label: string;
  onClick: keyof ClickHandlers;
};

const icons: IconItem[] = [
  { Icon: GrChannel, label: "내 채널", onClick: "handleGoToChannel" },
  { Icon: BsBroadcastPin, label: "치지직 방송", onClick: "handleBroadCast" },
  {
    Icon: IoHeartCircleOutline,
    label: "팔로잉 채널",
    onClick: "handleGoToFollowChannel",
  },
  { Icon: FaArrowRightToBracket, label: "로그아웃", onClick: "handleLogout" },
];

const ProfileBtn = () => {
  const supabase = createClient();
  const router = useRouter();
  const [isFold, setIsFold] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleGoToChannel = async (path: string) => {
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

        const finalPath = path.replace("[uid]", uid);

        router.push(finalPath);
      } else {
        console.error("사용자 정보가 없습니다.");
      }
    } catch (error) {
      console.error("채널로 이동 오류", error);
    }
  };

  const handleClick: ClickHandlers = {
    handleGoToChannel: () => handleGoToChannel("/channel/[uid]"),
    handleLogout,
    handleBroadCast: () => handleGoToChannel("/studio/[uid]"),
    handleGoToFollowChannel: () => handleGoToChannel("/channel/[uid]/follow"),
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
          {icons.map(({ Icon, label, onClick }, index) => (
            <button
              key={index}
              onClick={handleClick[onClick]}
              className="text-xs bg-[#333] text-white px-4 py-2 shadow w-auto whitespace-nowrap flex items-center gap-2 hover:bg-[#444]"
            >
              <span>
                <Icon />
              </span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
