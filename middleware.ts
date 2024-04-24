import { NextRequest, NextResponse } from 'next/server';
import NEXT_I18NEXT_CONFIG from './config/i18n.config';

const middleware = async (req: NextRequest): Promise<NextResponse<unknown>> => {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith('/images')) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith('/fonts')) {
    return NextResponse.next();
  }
  const currLang = req.url.split('/')[3];
  const langCookie = req.cookies.get('lang');
  if (langCookie?.value) {
    if (!NEXT_I18NEXT_CONFIG.i18n.locales.includes(currLang)) {
      return NextResponse.redirect(
        new URL(
          `/${NEXT_I18NEXT_CONFIG.i18n.locales.includes(langCookie.value) ? langCookie.value : 'en'}${req.nextUrl.pathname}`,
          req.url,
        ),
      );
    }
  }
  const local = req.headers.get('accept-language');
  if (local) {
    const lang = local.split(',')[0].split('-')[0].trim();
    if (!NEXT_I18NEXT_CONFIG.i18n.locales.includes(currLang)) {
      return NextResponse.redirect(
        new URL(`/${NEXT_I18NEXT_CONFIG.i18n.locales.includes(lang) ? lang : 'en'}${req.nextUrl.pathname}`, req.url),
      );
    }
  }
  return NextResponse.next();
};

export default middleware;
