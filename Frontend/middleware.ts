import acceptLanguage from 'accept-language';
import { cookieName, fallbackLng, languages } from '@/i18n/settings';
import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_URLS, roleConfig } from '@/constants/urls';
import { urlValidator } from '@/lib/url-validator';
import { Role } from '@/types/role';
import axios from 'axios';
import { getUrl } from '@/lib/getUrl';
import { parseJwt } from '@/lib/parse-jwt';
import { getJwtData } from '@/lib/get-jtw-data';
import { JWTPayload } from 'jose';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|mockServiceWorker.js|images).*)?'
  ]
};

const middleware = async (req: NextRequest) => {
  const response = NextResponse.next();

  if (
    req.nextUrl.pathname.includes('icon') ||
    req.nextUrl.pathname.includes('chrome')
  ) {
    return response;
  }

  const { pathname } = req.nextUrl;

  const pathnameHasLocale = languages.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  let lng: string;
  if (pathnameHasLocale) {
    lng = pathname.split('/')[1];
  } else {
    lng =
      acceptLanguage.get(req.cookies.get(cookieName)?.value) ||
      acceptLanguage.get(req.headers.get('Accept-Language')) ||
      fallbackLng;
  }

  const normalizedPathname = pathnameHasLocale
    ? pathname.replace(`/${lng}`, '') || '/'
    : pathname;

  if (!pathnameHasLocale) {
    const localePath = `/${lng}${pathname === '/' ? '' : pathname}`;
    const url = req.nextUrl.clone();
    url.pathname = localePath;
    return NextResponse.redirect(url);
  }

  const isPublicUrl = PUBLIC_URLS.some((path) =>
    normalizedPathname.startsWith(path)
  );

  const accessToken = req.cookies.get('Authentication')?.value;
  const refreshToken = req.cookies.get('Refresh')?.value;

  if (isPublicUrl) {
    return response;
  }

  let isAccessTokenValid: boolean | JWTPayload = false;

  if (accessToken) {
    isAccessTokenValid = (await parseJwt(accessToken)) ?? false;
  }

  if (!isAccessTokenValid && refreshToken) {
    try {
      const url = getUrl('refreshTokens', 'auth');
      const tokensResponse = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          },
          withCredentials: true
        }
      );

      const setCookies = tokensResponse.headers['set-cookie'];

      if (setCookies) {
        const cookiesArray = Array.isArray(setCookies)
          ? setCookies
          : [setCookies];
        cookiesArray.forEach((cookie) => {
          const [cookieName, cookieValue] = cookie.split(';')[0].split('=');

          response.cookies.set(cookieName.trim(), cookieValue.trim(), {
            httpOnly: true,
            path: '/'
          });
        });
      }
      return response;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      const url = req.nextUrl.clone();
      url.pathname = `/${lng}/login`;
      return NextResponse.redirect(url);
    }
  }

  if (!accessToken || !isAccessTokenValid) {
    const url = req.nextUrl.clone();
    url.pathname = `/${lng}/login`;
    return NextResponse.redirect(url);
  }

  const tokenPayload = await getJwtData();
  const { role } = tokenPayload || {};

  if (
    accessToken &&
    role &&
    !urlValidator({ role: role as Role, path: normalizedPathname })
  ) {
    const redirectPath = roleConfig[role as Role]?.redirectUrl || '/';
    const url = req.nextUrl.clone();
    url.pathname = `/${lng}${redirectPath}`;
    return NextResponse.redirect(url);
  }

  return response;
};

export default middleware;
