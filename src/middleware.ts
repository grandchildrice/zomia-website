import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Supported locales
const locales = ['ja', 'en'];
const defaultLocale = 'ja';

// Get the preferred locale from headers
function getLocale(request: NextRequest): string {
  // Negotiator expects plain object, so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // If no locale is found, use the default
  return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Skip for API routes and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // Skip files like favicon.ico
  ) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If there's no locale in the pathname, add one
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Redirect to locale path
    const url = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    url.search = request.nextUrl.search;

    // Permanently redirect
    return NextResponse.redirect(url, { status: 307 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
