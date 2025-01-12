'use client';
import { useEffect, useState } from "react";
import { createClient } from "../../../_utils/supabase/client";
import { useRouter, useParams } from 'next/navigation'; 
import Post from "./components/Post";
import BoardInput from "./components/BoardInput";
import Image from 'next/image';

const Channel = () => {
  const [isClient, setIsClient] = useState(false); 
  const [posts, setPosts] = useState<{ id: number; nickname: string; content: string; img_url: string | null; profile_img: string | null }[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const router = useRouter();
  const { uid } = useParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchLoggedInUserId();
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && typeof uid === 'string') {
      fetchPosts(uid); 
    }
  }, [isClient, uid]);

  const fetchLoggedInUserId = async () => {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("로그인된 사용자 정보 불러오기 오류", error);
    } else {
      setLoggedInUserId(user?.id || null);
    }
  };

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
        <div className="ml-4 w-10/12">
          {loggedInUserId === uid && <BoardInput />} 
          <div className="flex w-full flex-col-reverse bg-white rounded-lg mt-6 gap-6">
            {posts.length === 0 ? (
              <div className="flex flex-col justify-center items-center my-20 pt-10">
                <Image 
                  src="/channelPage/no_content.svg" 
                  alt="No content" 
                  width={180} 
                  height={180} 
                />
                <p className="text-md font-bold">이 채널의 커뮤니티는 너무 조용해요...</p>

              </div>
            ) : (
              posts.map((post) => (
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
              ))
            )}
          </div>
        </div>
        <div className="h-32" />
    </>
  );
};

export default Channel;
