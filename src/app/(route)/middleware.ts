import { type NextRequest } from 'next/server';
import { updateSession } from '@/app/_utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // _next/static, _next/image, favicon.ico, 이미지파일 확장자 제외한 모든 경로에서 미들웨어 실행
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
