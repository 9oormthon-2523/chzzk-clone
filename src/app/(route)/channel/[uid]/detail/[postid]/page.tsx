'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/app/_utils/supabase/client';
import Image from 'next/image';

interface PostDetail {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  img_url: string | null;
}

export default function Detail() {
  const router = useRouter();
  const { postid, uid } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const formattedDate = post ? new Date(post.created_at).toLocaleString() : '';

  useEffect(() => {
    if (!postid) {
      console.log('postid가 없음');
      return;
    }

    const fetchPostById = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('posts')
          .select('id, nickname, content, created_at, img_url')
          .eq('id', postid)
          .single();

        if (error) {
          console.error('게시글 불러오기 오류:', error);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('불러오기 에러:', err);
      }
    };

    fetchPostById();
  }, [postid]);

  const handleDelete = async () => {
    if (!postid) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postid);

      if (error) {
        console.error('게시글 삭제 오류:', error);
      } else {
        console.log('게시글 삭제 완료');
        router.push(`/channel/${uid}`);
      }
    } catch (err) {
      console.error('게시글 삭제 에러:', err);
    }
  };

  if (!post) {
    return <div className="p-4">게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="p-4">
      <div className="mx-12">
        <button
          className="mt-4 mr-2 px-4 py-2 bg-gray-100 font-bold rounded-xl hover:bg-gray-200"
          onClick={() => router.push(`/channel/${uid}`)} >
            목록
        </button>
        <button
          className="mt-4 mr-2 px-4 py-2 bg-gray-100 font-bold rounded-xl hover:bg-gray-200"
          onClick={() => router.push(`/channel/${uid}/edit/${post.id}`)} >
            수정
        </button>
        <button 
          onClick={handleDelete}
          className="mt-4 px-4 py-2 bg-gray-100 font-bold text-red-500 rounded-xl hover:bg-gray-200"
        >
          삭제
        </button>

        <div className="mt-6 max-w-5xl flex flex-row bg-gray-50 p-4 rounded-tl-xl rounded-tr-xl border-b border-gray-300">
          <div className="flex flex-col flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md text-sm mr-2" />
          <div className="flex flex-col flex-wrap">
            <p className="text-m font-black">{post.nickname}</p>
            <p className="w-full text-sm font-semibold text-gray-700 mt-1">{formattedDate}</p>
            <div className="text-m w-full min-h-32 break-words mt-4">{post.content}</div>
            {post.img_url && (
              <div className="mt-4">
                <Image
                  src={post.img_url}
                  alt="게시글 이미지"
                  width={500}
                  height={300}
                  unoptimized
                  className="rounded border"
                />
              </div>
            )}
          </div>
        </div>
        <div className="max-w-5xl bg-gray-50 p-4 h-10 rounded-bl-xl rounded-br-xl"/>
      </div>
      <div className="h-32" />
    </div>
  );
}
