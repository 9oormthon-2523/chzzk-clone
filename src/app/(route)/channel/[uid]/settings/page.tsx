'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/app/_utils/supabase/client';

interface UserType {
  email: string;
  id: string;
  name: string;
  img: string;
  channel_intro?: string;
}

export default function Settings() {
  const supabase = createClient();

  const [user, setUser] = useState<UserType | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [channelIntro, setChannelIntro] = useState<string>('');
  const [nicknameLength, setNicknameLength] = useState<number>(0);
  const [channelIntroLength, setChannelIntroLength] = useState<number>(0);

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
        channel_intro: '', 
      });

      if (supabaseUser.user_metadata?.avatar_url) {
        setPreviewUrl(supabaseUser.user_metadata.avatar_url);
      }

      setNickname(supabaseUser.user_metadata?.full_name ?? '');
      
      const { data: userDetails, error: fetchUserDetailsError } = await supabase
        .from('users')
        .select('channel_intro')
        .eq('id', supabaseUser.id)
        .single();

      if (fetchUserDetailsError) {
        throw new Error(fetchUserDetailsError.message);
      }

      setChannelIntro(userDetails?.channel_intro ?? '');

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
          full_name: nickname,
          avatar_url: finalImageUrl,
        },
      });

      if (updateError) {
        throw new Error(`사용자 업데이트 실패: ${updateError.message}`);
      }

      const { error: upsertError } = await supabase
        .from('users')
        .upsert([
          {
            id: user.id,
            nickname: nickname,
            profile_img: finalImageUrl,
            channel_intro: channelIntro,
          },
        ]);

      if (upsertError) {
        throw new Error(`users 테이블 업데이트 실패: ${upsertError.message}`);
      }

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          name: nickname,
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

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameLength(e.target.value.length);
  };

  const handleChannelIntroChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChannelIntro(e.target.value);
    setChannelIntroLength(e.target.value.length);
  };

  return (
    <div className="mx-12">
      <div className="h-32" />
      <div className="flex items-center justify-end">
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
      </div>
      <div className="bg-gray-50 rounded-xl mt-4 p-6">
        {user ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <p className="w-24 mt-4 shrink-0 font-bold text-gray-700 mr-6 mb-24">프로필 이미지</p>
              <div className="flex flex-row items-center gap-2">
                {previewUrl ? (
                  <div className="rounded-full w-[140px] h-[140px] overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="새 프로필 미리 보기"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-300 rounded-full mb-2" />
                )}
                <label className="ml-2 inline-flex items-center h-9 px-4 py-2 bg-gray-50 text-sm font-semibold rounded-md cursor-pointer border border-gray-200 hover:bg-gray-200">
                  이미지 수정
                  <input type="file" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex flex-row gap-2 mt-4">
              <p className="w-24 mr-8 shrink-0 font-bold text-gray-700">이메일</p>
              <div className="text-sm">{user.email}</div>
            </div>

            <div className="flex flex-row gap-2 mt-4">
              <p className="w-24 mr-8 shrink-0 font-bold text-gray-700">닉네임</p>
              <input
                className="w-full border rounded p-2 w-64 text-sm bg-gray-100 focus:border-[#8dd9b9] focus:bg-white focus:outline-none"
                value={nickname}
                onChange={handleNicknameChange}
                maxLength={10}
              />
              <div className="w-16 text-sm text-gray-500">{nicknameLength} / 10</div> 
            </div>

            <div className="flex flex-row gap-2 mt-4">
              <p className="w-24 mr-8 shrink-0 font-bold text-gray-700">채널 소개</p>
              <textarea
                className="w-full h-20 border rounded outline-none resize-none p-2 w-64 text-sm bg-gray-100 focus:border-[#8dd9b9] focus:bg-white"
                value={channelIntro}
                onChange={handleChannelIntroChange}
                maxLength={100}
              />
              <div className="w-16 text-sm text-gray-500">{channelIntroLength} / 100</div>
            </div>
          </div>
        ) : (
          <div className="text-center">사용자 정보를 불러오는 중...</div>
        )}
      </div>
    </div>
  );
}