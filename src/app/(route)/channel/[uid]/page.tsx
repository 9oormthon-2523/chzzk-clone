'use client';
import { useEffect, useState } from "react";
import { createClient } from "../../../_utils/supabase/client";
import { useRouter, useParams } from 'next/navigation'; 
import Post from "./components/Post";
import BoardInput from "./components/BoardInput";

const Channel = () => {
  const [isClient, setIsClient] = useState(false); 
  const [posts, setPosts] = useState<{ id: number; nickname: string; content: string; img_url: string | null; profile_img: string | null }[]>([]);
  const router = useRouter();
  const { uid } = useParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof uid === 'string') {
      fetchPosts(uid); 
    }
  }, [isClient, uid]);

  const fetchPosts = async (uid: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id, nickname, content, img_url, user_id") 
      .eq("user_id", uid); 

    if (error) {
      console.error("글 불러오기 오류", error);
    } else {
      const postsWithProfileImg = await Promise.all(data.map(async (post) => {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("profile_img")
          .eq("id", post.user_id)
          .single();

        if (userError) {
          console.error("사용자 정보 불러오기 오류", userError);
        }

        return {
          ...post,
          profile_img: userData?.profile_img || null, 
        };
      }));

      setPosts(postsWithProfileImg || []);
    }
  };

  return (
    <>
        <p className="text-xl font-black ml-4 mt-6">커뮤니티</p>
        <div className="ml-4 w-10/12">
          <BoardInput />
          <div className="flex w-full flex-col-reverse bg-white rounded-lg mt-6 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => router.push(`/channel/${uid}/detail/${post.id}`)} 
              >
                <Post 
                  nickname={post.nickname} 
                  content={post.content} 
                  img_url={post.img_url} 
                  profile_img={post.profile_img}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="h-32" />
    </>
  );
};

export default Channel;
