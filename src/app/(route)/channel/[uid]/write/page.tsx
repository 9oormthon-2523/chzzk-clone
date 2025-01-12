'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from "../../../../_utils/supabase/client";
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

const supabase = createClient();

export default function Page() {
  const router = useRouter();
  const { uid } = useParams();
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!uid) return;
    
    const fetchNickname = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('nickname')
          .eq('id', uid)
          .single(); 

        if (error) {
          console.error('닉네임 불러오기 오류:', error);
        } else if (data) {
          setNickname(data.nickname); 
        }
      } catch (err) {
        console.error('에러 발생:', err);
      }
    };

    fetchNickname();
  }, [uid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (selectedFile) {
        const fileName = `${Date.now()}_${crypto.randomUUID()}`;
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('post_img')
          .upload(fileName, selectedFile);
        if (storageError) {
          console.error('이미지 업로드 오류:', storageError);
        } else if (storageData) {
          const { data: publicUrlData } = supabase
            .storage
            .from('post_img')
            .getPublicUrl(storageData.path);
          if (publicUrlData?.publicUrl) {
            imageUrl = publicUrlData.publicUrl;
          }
        }
      }

      const { error } = await supabase
        .from('posts')
        .insert([{ content: text, nickname: nickname, img_url: imageUrl, user_id: uid }]); 
      if (error) {
        console.error('글쓰기 오류:', error);
      } else {
        router.push(`/channel/${uid}`);
      }
    } catch (err) {
      console.error('에러 발생:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="m-auto mt-12 p-8 w-full bg-gray-50 rounded-lg">
        <p className="text-xl font-black mb-4">글쓰기</p>
        <div className="mb-4">
          <label className="inline-flex items-center px-4 py-2 bg-gray-100 font-bold rounded-full cursor-pointer hover:bg-gray-200">
            <Image
              src="/channelPage/post_img.svg"
              alt="아이콘"
              width={24}
              height={24}
              className="mr-2"
            />
            사진
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {previewUrl && (
          <div className="mb-4">
            <div className="relative w-[200px] h-[200px]">
              <Image
                src={previewUrl}
                alt="미리 보기"
                fill
                unoptimized
                className="rounded border object-cover"
              />
            </div>
          </div>
        )}
        <textarea
          name="text"
          className="form-textarea mt-1 pt-4 block w-full h-96 bg-gray-50 outline-none resize-none border-t border-b border-gray-300"
          placeholder="어떤 이야기를 남길건가요?"
          value={text}
          onChange={handleInputChange}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className={`inline-flex justify-center py-2 px-4 w-24 border border-transparent shadow-sm text-sm rounded-md mt-4 font-black ${
              text ? "bg-[#1bb373] text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            등록
          </button>
        </div>
      </form>
      <div className="h-32" />
    </>
  );
}
