import { createClient } from '@/app/_utils/supabase/server';
import { NextResponse } from 'next/server';

interface Follower {
  id: number;
  created_at: string;
  follower_uid: string;
  following_uid: string;
  follower_nickname: string;
  follower_profile_img: null | string;
  status: 'active' | 'block';
}

export async function GET() {
  const supabase = await createClient();

  // 1. 로그인된 유저 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 2. 로그인된 유저의 uid를 이용하여 나의 팔로워들의 정보를 가져옴
  const { data, error } = await supabase
    .from('follower_details')
    .select('*')
    .eq('following_uid', user.id);

  if (error)
    return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 });

  // 3. 리턴할 객체 다듬기
  const followers = data.map((item: Follower) => ({
    id: item.id,
    created_at: item.created_at,
    status: item.status,
    follower: {
      uid: item.follower_uid,
      nickname: item.follower_nickname,
      profile_img: item.follower_profile_img || '/userImage.webp',
    },
  }));

  return NextResponse.json({ followers }, { status: 200 });
}
