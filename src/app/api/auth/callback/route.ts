import { NextResponse } from 'next/server';
import { createClient } from '@/app/_utils/supabase/server';
import { notFound } from 'next/navigation';

export async function GET(request: Request) {
  // URL에서 쿼리 파라미터 가져오기
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code'); // OAuth 인증 코드

  if (code) {
    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 인증 코드로 세션 교환
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // 오류가 없다면
    // 1. public.users 테이블에 유저 정보 저장
    // 2. next로 redirect

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user)
        await supabase.from('users').upsert({
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          nickname: user.user_metadata.full_name,
          profile_img: user.user_metadata.avatar_url,
          channel_intro: null,
        });
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // 오류 페이지로 리다이렉트
  return notFound();
}
