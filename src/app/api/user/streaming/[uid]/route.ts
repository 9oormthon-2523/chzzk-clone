import { createClient } from '@/app/_utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const supabase = await createClient();
  const { uid } = await params;

  // 1. 로그인된 유저의 uid를 이용하여 현재 스트리밍 정보를 가져옴
  const { data, error } = await supabase
    .from('streaming_rooms')
    .select('*')
    .eq('uid', uid)
    .single();

  if (error)
    return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}
