"use client";

import { createClient } from '@/app/_utils/supabase/client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const StreamingCoreBtn = dynamic(() => import('./StreamingCoreBtn.client'), { ssr: false });

const StreamingBtn = () => {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (!error && user) {
        setUserId(user.user.id);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return null;
  

  return <>{userId ? <StreamingCoreBtn uid={userId} /> : <p>사용자 정보를 불러올 수 없습니다.</p>}</>;
};

export default StreamingBtn;