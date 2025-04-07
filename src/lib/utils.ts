export function getLocalizedPathname(pathname: string, locale: string): string {
  // 現在のパスから言語プレフィックスを取り除く
  const path = pathname.replace(/^\/en(\/|$)/, '/');

  // 新しいロケールに基づいてパスを作成
  if (locale === 'ja') {
    return path;
  } else {
    return `/en${path}`;
  }
}
