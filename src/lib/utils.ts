export function getLocalizedPathname(pathname: string, locale: string): string {
  // 現在のパスから言語プレフィックスを取り除く
  const path = pathname.replace(/^\/en(\/|$)/, '/');

  // クエリパラメータを含むかチェック
  const hasQueryParams = path.includes('?');

  // 新しいロケールに基づいてパスを作成
  if (locale === 'ja') {
    return path;
  } else {
    // クエリパラメータがある場合は&で、ない場合は?で連結
    const connector = hasQueryParams ? '&' : '?';
    return `${path}${connector}locale=en`;
  }
}
