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

      if (user) {
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (selectError) {
          // 데이터 삽입중 Error 발생
          return NextResponse.json({ error: selectError }, { status: 500 });
        }

        if (!existingUser) {
          // 유저가 존재하지 않을 경우 insert
          const { error: insertError } = await supabase.from('users').insert({
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            nickname: user.user_metadata.full_name,
            profile_img: user.user_metadata.avatar_url,
            channel_intro: null,
          });

          if (insertError) {
            // 데이터 삽입중 Error 발생
            return NextResponse.json({ error: insertError }, { status: 500 });
          }
        }
      }

      return NextResponse.redirect(`${origin}/`);
    }
  }

  // 오류 페이지로 리다이렉트
  return notFound();
}
