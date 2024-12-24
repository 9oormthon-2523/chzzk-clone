'use client';

import { useState, useEffect } from "react"
import {createClient} from "../../_utils/supabase/client";
import ChannelProfile from "./components/ChannelProfile"
import Post from "./components/Post"
import BoardInput from "./components/BoardInput"

const Channel = () => {
  const [posts, setPosts] = useState<{ nickname: string; content: string }[]>([]);
  useEffect(() => {
    console.log("데이터 불러오기");
    const fetchPosts = async () => {
      try {
        const supabase = createClient();  
        const { data, error } = await supabase
          .from('posts') 
          .select('nickname, content');

        console.log("잘 되는중", data);
        console.log('error:', error);

        if (error) throw error; 
        setPosts(data || []);
      } catch (error) {
        console.error('데이터 불러오기 실패', error);
      }
    };


    fetchPosts(); 
  }, []);

  return (
    <>
      <div className="ml-12 mr-12">
        <ChannelProfile nickname="엄청난 물고기" follower={2.4} context="매일 물고기 썰 풀어드립니다."/>
          <p className="text-xl font-black ml-4 mt-6">커뮤니티</p>
          <BoardInput/>
          <div className="flex items-start flex-col max-w-7xl bg-white rounded-lg m-2 mt-6 gap-6">
          {posts.map((post, id) => (
            <Post key={id} nickname={post.nickname} content={post.content} />
          ))}
          </div>
        <div className="h-32"/>
      </div>
    </>

  )
}

export default Channel