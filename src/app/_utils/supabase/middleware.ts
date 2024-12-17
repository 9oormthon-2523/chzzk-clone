import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // 쿠키나 추가 설정을 담아 반환할 응답 객체의 초기 상태 정의
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // cookiesToSet === 갱신된 세션 토큰들
          // 1. 요청 객체의 쿠키값을 업데이트
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // 2. 응답 객체를 업데이트된 쿠키값으로 동기화
          supabaseResponse = NextResponse.next({
            request,
          });
          // 3. 클라이언트(브라우저) 쿠키 업데이트
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.redirect(new URL('/', request.url));
  return supabaseResponse;
}
