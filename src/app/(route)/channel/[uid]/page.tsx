'use client';
import { useEffect, useState } from "react";
import { createClient } from "../../../_utils/supabase/client";
import Link from 'next/link';
import ChannelProfile from "./components/ChannelProfile";
import Post from "./components/Post";
import BoardInput from "./components/BoardInput";

const Channel = () => {
  const [posts, setPosts] = useState<{ id: number; nickname: string; content: string; img_url: string | null }[]>([]);

  const fetchPosts = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id, nickname, content, img_url");

    if (error) {
      console.error("글 불러오기 오류", error);
    } else {
      setPosts(data || []);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="mx-12">
        <div className="h-32" />
        <ChannelProfile nickname="엄청난 물고기" follower={2.4} context="매일 물고기 썰 풀어드립니다." />
        <p className="text-xl font-black ml-4 mt-6">커뮤니티</p>
        <div className="ml-4 w-10/12">
          <BoardInput />
          <div className="flex w-full flex-col bg-white rounded-lg mt-6 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/channel/1/detail/${post.id}`} passHref>
              <Post nickname={post.nickname} content={post.content} img_url={post.img_url}/>
            </Link>
            ))}
          </div>
        </div>
        <div className="h-32" />
      </div>
    </>
  );
};

export default Channel;
