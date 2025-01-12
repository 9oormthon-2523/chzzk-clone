import { createClient } from '@/app/_utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { uid } = body;

  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  }

  const { data: usersTable } = await supabase
    .from('users')
    .select('nickname')
    .eq('id', uid)
    .single();

  // 현재 로그인 된 유저의 is_active를 false로 변경, 시청자 수 초기화
  const { data, error } = await supabase
    .from('streaming_rooms')
    .update({
      title: `${usersTable?.nickname}의 라이브 방송`,
      thumbnail: null,
      tags: [],
      category: '',
      is_active: false,
      audience_cnt: 0,
      start_time: null,
    })
    .eq('uid', uid);

  if (error) {
    return NextResponse.json({ error: 'DB Update Error' }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
