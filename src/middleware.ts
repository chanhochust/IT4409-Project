import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE } from 'src/shared/constants/locale';

const PUBLIC_FILE = /\.(.*)$/;
const AVAILABLE_LOCALES = ['en', 'vi'];

function getLocale(request: NextRequest) {
  // Check if there's a locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = AVAILABLE_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1];
    return locale;
  }

  // Check if there's a locale in the cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && AVAILABLE_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check if there's a preferred locale from the headers
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage.split(',');
    for (const prefLocale of preferredLocales) {
      const localePart = prefLocale.split(';')[0];
      if (localePart) {
        const locale = localePart.trim();
        if (AVAILABLE_LOCALES.includes(locale)) {
          return locale;
        }
      }
    }
  }

  // Default locale
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  // Skip public files
  if (PUBLIC_FILE.test(request.nextUrl.pathname) || request.nextUrl.pathname.includes('/api/')) {
    return;
  }

  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameIsMissingLocale = AVAILABLE_LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Redirect to the same URL with locale prefix
    return NextResponse.redirect(new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
