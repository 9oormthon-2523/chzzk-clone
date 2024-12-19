import { NextResponse } from 'next/server';
import { createClient } from '@/app/_utils/supabase/server';
import { notFound } from 'next/navigation';

export async function GET(request: Request) {
  // URL에서 쿼리 파라미터 가져오기
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code'); // OAuth 인증 코드
  const next = searchParams.get('next') ?? '/'; // 리다이렉트할 경로

  if (code) {
    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 인증 코드로 세션 교환
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // 오류가 없다면 로그인처리 (redirect)
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  // 오류 페이지로 리다이렉트
  return notFound();
}
