export function getLocalizedPathname(pathname: string, locale: string): string {
  // ルートパスの場合
  if (pathname === '/' || pathname === '/en') {
    return locale === 'ja' ? '/' : '/en';
  }

  // 英語パスの場合（/en/about など）
  if (pathname.startsWith('/en/')) {
    const path = pathname.replace('/en', '');
    return locale === 'ja' ? path : pathname;
  }

  // 日本語パスの場合（/about など）
  return locale === 'ja' ? pathname : `/en${pathname}`;
}
