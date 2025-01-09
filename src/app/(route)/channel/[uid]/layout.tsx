"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from "@/app/_components/Header/Header.server";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import { createClient } from "../../../_utils/supabase/client";
import ChannelProfile from "@/app/(route)/channel/[uid]/components/ChannelProfile";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const { isOpen } = useNavToggle();
  const [isClient, setIsClient] = useState(false); 
  const [userInfo, setUserInfo] = useState<{ nickname: string; channel_intro: string; img_url: string } | null>(null);
  const { uid } = useParams(); 
  
  const fetchUserInfo = async () => {
    if (!uid) return; 
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .select("nickname, channel_intro, profile_img")
      .eq("id", uid)
      .single();

    if (error) {
      console.error("사용자 정보 불러오기 오류", error);
    } else {
      setUserInfo({
        nickname: data.nickname,
        channel_intro: data.channel_intro,
        img_url: data.profile_img || "",
      });
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && uid) {
      fetchUserInfo(); 
    }
  }, [isClient, uid]);

  if (!userInfo) return <p>로딩 중...</p>;

  return (
    <div>
      <Header />
      {isOpen && <NavBar />}
      <div className="mx-12">
        <div className="h-32" />
        <ChannelProfile
          img_url={userInfo.img_url}
          nickname={userInfo.nickname}
          follower={2.4} 
          context={userInfo.channel_intro}
        />
      {children}
      </div>
    </div>
  );
};

export default RootLayout;
