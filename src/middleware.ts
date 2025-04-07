import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // /en/path をすべて /path に書き換え、ヘッダーで英語ロケールを指定
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    // /en または /en/path を /path としてアクセス
    // /en の場合は / に、/en/about は /about に変換
    const jaPath = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');

    // ベースパスを書き換える
    request.nextUrl.pathname = jaPath;
    const response = NextResponse.rewrite(request.nextUrl);

    // ロケール情報をヘッダーに追加して英語ページとして処理されるようにする
    response.headers.set('x-locale', 'en');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/en', '/en/:path*'],
};
