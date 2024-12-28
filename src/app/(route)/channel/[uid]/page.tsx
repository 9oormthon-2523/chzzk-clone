'use client';
import { useEffect, useState } from "react";
import { createClient } from "../../../_utils/supabase/client";
import ChannelProfile from "./components/ChannelProfile";
import Post from "./components/Post";
import BoardInput from "./components/BoardInput";

const Channel = () => {
  const [posts, setPosts] = useState<{ nickname: string; content: string }[]>([]);

  const fetchPosts = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("nickname, content");
      console.log(data);

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
    <div className="mx-12">
      <ChannelProfile nickname="엄청난 물고기" follower={2.4} context="매일 물고기 썰 풀어드립니다." />
      <p className="text-xl font-black ml-4 mt-6">커뮤니티</p>
      <div className="ml-4">
        <BoardInput />
        <div className="flex items-start flex-col max-w-7xl bg-white rounded-lg mt-6 gap-6">
          {posts.map((post, id) => (
            <Post key={id} nickname={post.nickname} content={post.content} />
          ))}
        </div>
      </div>
      <div className="h-32" />
    </div>
  );
};

export default Channel;