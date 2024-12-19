'use client';

import React from 'react';
import { createClient } from '@/app/_utils/supabase/client';

const KakaoBtn = () => {
  const supabase = createClient();

  async function signInWithOAuth() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error('OAuth 로그인 실패:', error.message);
    }
  }

  return (
    <div className="m-9">
      <button
        className="bg-yellow-400 p-5 font-blackHanSans rounded-lg"
        onClick={signInWithOAuth}
      >
        카카오 로그인
      </button>
    </div>
  );
};

export default KakaoBtn;
