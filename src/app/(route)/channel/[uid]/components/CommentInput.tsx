'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/app/_utils/supabase/client';

interface CommentInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
}

const CommentInput = ({ value, onChange, onClick }: CommentInputProps) => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const supabase = createClient();
  const defaultImage = '/channelPage/blank_profile.svg';

  const fetchUserProfile = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();

      if (user?.user?.id) {
        const { data: userInfo, error } = await supabase
          .from('users')
          .select('profile_img')
          .eq('id', user.user.id)
          .single();

        if (error) {
          console.error('프로필 이미지 가져오기 오류:', error);
        } else {
          setProfileImg(userInfo?.profile_img || null);
        }
      }
    } catch (err) {
      console.error('로그인 정보 가져오기 오류:', err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col w-full p-2 bg-white rounded-xl border border-gray-100 items-center font-semibold text-gray-500 pl-4">
      <div className="flex w-full flex-row">
        <div className="flex flex-col flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md text-sm mr-2 relative">
            <Image
              src={profileImg || defaultImage}
              alt="프로필 이미지"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
        </div>

        <textarea
          className="p-2 w-full h-full outline-none resize-none"
          placeholder="댓글을 입력하세요."
          value={value}
          onChange={onChange}
        />
      </div>

      <button
        className="ml-auto bg-gray-100 hover:bg-gray-200 rounded-2xl px-4 py-2 text-sm font-bold text-gray-500"
        onClick={onClick}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;