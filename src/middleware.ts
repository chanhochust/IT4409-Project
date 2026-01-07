import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE } from 'src/shared/constants/locale';
import { AppRouter } from './shared/constants/appRouter.constant';
import { clientEnvironment } from './shared/environments/client';

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
  const cookieLocale = request.cookies.get('i18next')?.value;
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

function getCleanPathname(pathname: string) {
  for (const locale of AVAILABLE_LOCALES) {
    if (pathname.startsWith(`/${locale}/`)) {
      pathname = pathname.replace(`/${locale}`, '');
    }
    if (pathname === `/${locale}`) {
      return '/';
    }
  }
  return pathname;
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: clientEnvironment.secretNextAuth });
  const pathname = request.nextUrl.pathname;
  // Check user preference locale if logged in
  // if (token?.language) {
  //   const userLocale = token?.language;
  //   const currentLocale = getLocale(request);

  //   // If user's preferred locale is different from current URL locale, redirect
  //   if (userLocale !== currentLocale && AVAILABLE_LOCALES.includes(userLocale)) {
  //     const cleanPathname = getCleanPathname(pathname);
  //     const searchParams = new URL(request.url).searchParams;

  //     return NextResponse.redirect(
  //       new URL(
  //         `/${userLocale}${cleanPathname === '/' ? '' : cleanPathname}${searchParams.size ? `?${searchParams.toString()}` : ''}`,
  //         request.url,
  //       ),
  //     );
  //   }
  // }

  const publicRoutes = [
    AppRouter.home,
    AppRouter.login,
    AppRouter.forgotPassword,
    AppRouter.register,
    AppRouter.resetPassword,
    AppRouter.chat,
  ];
  if (token && publicRoutes.includes(getCleanPathname(pathname))) {
    return NextResponse.redirect(new URL(AppRouter.dashboard, request.url));
  }

  // If there's no token and not in public route and the pathname is localhost:3000/en or /vi. It runs, also skip request images
  if (
    !token &&
    !publicRoutes.includes(getCleanPathname(pathname)) &&
    getCleanPathname(pathname) !== `/${getLocale(request)}`
  ) {
    if (pathname.startsWith('/images')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(AppRouter.login, request.url));
  }

  // Skip public files
  if (PUBLIC_FILE.test(request.nextUrl.pathname) || request.nextUrl.pathname.includes('/api/')) {
    return;
  }

  // Check if the pathname already has a locale
  const pathnameIsMissingLocale = AVAILABLE_LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const searchParams = new URL(request.url).searchParams;

    // Redirect to the same URL with locale prefix
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}${searchParams.size ? `?${searchParams.toString()}` : ''}`,
        request.url,
      ),
    );
  }
  if (pathname.startsWith('/images') || pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  // default case
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
