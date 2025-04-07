import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 英語ページへのリダイレクト処理
  const pathname = request.nextUrl.pathname;
  
  // /en パスへのアクセスを /en/ にリダイレクト
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/en/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/en'],
};
