"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams, useSelectedLayoutSegment } from 'next/navigation';
import Header from "@/app/_components/Header/Header.server";
import NavBar from "@/app/(route)/(main)/_components/NavBar/NavBar.client";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import { createClient } from "../../../_utils/supabase/client";
import ChannelProfile from "@/app/(route)/channel/[uid]/components/ChannelProfile";
import Footer from '@/app/_components/Footer/footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const { isOpen } = useNavToggle();
  const [isClient, setIsClient] = useState(false); 
  const [userInfo, setUserInfo] = useState<{ nickname: string; channel_intro: string; img_url: string } | null>(null);
  const { uid } = useParams(); 
  const router = useRouter();
  const activeSegment = useSelectedLayoutSegment();
  const isCommunityActive = !activeSegment || ['post', 'comment', 'detail', 'edit'].includes(activeSegment || '');

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

  const handleTabClick = (path: string) => {
    router.push(path);
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
      <div className="mx-12 ml-28">
        <div className="h-28" />
        <ChannelProfile
          img_url={userInfo.img_url}
          nickname={userInfo.nickname}
          follower={2.4} 
          context={userInfo.channel_intro}
          is_following={false}
        />
        <div className="flex flex-row mb-6">
          <p
            className={`text-xl font-black ml-4 mt-6 p-2 cursor-pointer ${
              isCommunityActive ? 'text-black border-b-4 border-black' : 'text-gray-400'
            }`}
            onClick={() => handleTabClick(`/channel/${uid}`)}
          >
            커뮤니티
          </p>
          <p
            className={`text-xl font-black ml-4 mt-6 p-2 cursor-pointer ${
              activeSegment === 'follow' ? 'text-black border-b-4 border-black' : 'text-gray-400'
            }`}
            onClick={() => handleTabClick(`/channel/${uid}/follow`)}
          >
            팔로우 목록
          </p>
        </div>

        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
