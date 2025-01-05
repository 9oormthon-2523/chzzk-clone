'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/app/_utils/supabase/client';

const Settings = () => {
  const [user, setUser] = useState<null | { email: string; id: string; name: string }>(null);
  const supabase = createClient();

  const fetchUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("사용자 정보가 존재하지 않습니다.");
      setUser({ email: user.email ?? '', id: user.id, name: user.user_metadata.full_name });
    } catch (error) {
      console.error("사용자 정보 불러오기 오류", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = async () => {
    if (!user) return; 
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: user.name, 
        },
      });

      if (error) {
        console.error('사용자 업데이트 실패:', error.message);
      } else {
        console.log('사용자 업데이트 성공:', data);
      }
    } catch (error) {
      console.error('사용자 정보 업데이트 중 오류 발생', error);
    }
  };

  return (
    <div className='mx-12'>
      <div className="h-32" />
      <button className='inline-flex justify-center mr-2 py-2 px-4 w-16 border border-transparent shadow-sm text-sm rounded-md mt-4 font-black bg-gray-200 text-gray-500 '>취소</button>
      <button 
        className='inline-flex justify-center py-2 px-4 w-16 border border-transparent shadow-sm text-sm rounded-md mt-4 font-black bg-[#1bb373] text-white '
        onClick={updateUser}>저장</button>
      <div className='h-96 bg-gray-100 rounded-xl'>
        {user ? (
          <div className='flex flex-col'>
            <p>이메일</p>
            <div>{user.email}</div>
            <textarea
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
        ) : (
          <div className='text-center'>사용자 정보를 불러오는 중...</div>
        )}
      </div>
    </div>
  );
}

export default Settings;
