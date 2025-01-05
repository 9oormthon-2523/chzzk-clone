'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/app/_utils/supabase/client';

interface UserType {
  email: string;
  id: string;
  name: string;
  img: string;
}

export default function Settings() {
  const supabase = createClient();

  const [user, setUser] = useState<UserType | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const fetchUser = async () => {
    try {
      const {
        data: { user: supabaseUser },
        error: getUserError,
      } = await supabase.auth.getUser();

      if (getUserError) {
        throw new Error(getUserError.message);
      }

      if (!supabaseUser) {
        throw new Error('사용자 정보가 존재하지 않습니다.');
      }

      setUser({
        email: supabaseUser.email ?? '',
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.full_name ?? '',
        img: supabaseUser.user_metadata?.avatar_url ?? '',
      });

      if (supabaseUser.user_metadata?.avatar_url) {
        setPreviewUrl(supabaseUser.user_metadata.avatar_url);
      }
    } catch (error) {
      console.error('사용자 정보 불러오기 오류', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewImage(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const updateUser = async () => {
    if (!user) return;

    try {
      let finalImageUrl = user.img;

      if (newImage) {
        const filePath = `avatars/${user.id}/${Date.now()}_${newImage.name}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, newImage);

        if (uploadError) {
          throw new Error(`이미지 업로드 오류: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);

        if (!publicUrlData) {
          throw new Error('이미지 URL 가져오기 오류');
        }

        if (publicUrlData?.publicUrl) {
          finalImageUrl = publicUrlData.publicUrl;
        }
      }

      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: user.name,
          avatar_url: finalImageUrl,
        },
      });

      if (updateError) {
        throw new Error(`사용자 업데이트 실패: ${updateError.message}`);
      }

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          name: user.name, 
          img: finalImageUrl,
        };
      });

      setNewImage(null); 
      console.log('사용자 업데이트 성공', updatedUser);
      alert('프로필이 업데이트되었습니다!');
    } catch (error) {
      console.error('프로필 업데이트 오류', error);
    }
  };

  return (
    <div className="mx-12">
      <div className="h-32" />
      <button
        className="inline-flex justify-center mr-2 py-2 px-4 w-16 border border-transparent shadow-sm text-sm rounded-md mt-4 font-black bg-gray-200 text-gray-500"
        onClick={() => {
          window.history.back();
        }}
      >
        취소
      </button>
      <button
        className="inline-flex justify-center py-2 px-4 w-16 border border-transparent shadow-sm text-sm rounded-md mt-4 font-black bg-[#1bb373] text-white"
        onClick={updateUser}
      >
        저장
      </button>

      <div className="h-96 bg-gray-100 rounded-xl mt-4 p-4">
        {user ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold text-gray-700">이메일</p>
              <div>{user.email}</div>
            </div>

            <div>
              <p className="font-bold text-gray-700">이름</p>
              <input
                className="border rounded p-1 w-64"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col items-center">
              <p className="font-bold text-gray-700">프로필 사진</p>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="새 프로필 미리 보기"
                  width={100}
                  height={100}
                  className="rounded-full object-cover mb-2"
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-gray-300 rounded-full mb-2" />
              )}

              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
        ) : (
          <div className="text-center">사용자 정보를 불러오는 중...</div>
        )}
      </div>
    </div>
  );
}
