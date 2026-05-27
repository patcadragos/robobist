import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ro', 'de', 'fr', 'it', 'es', 'pl', 'nl', 'pt', 'cs', 'hu', 'sv', 'da', 'fi', 'no']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hasLocale = locales.some(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)
  if (hasLocale) return NextResponse.next()
  return NextResponse.redirect(new URL(`/en${pathname === '/' ? '' : pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next|api|ROBOBIST|favicon|sitemap|robots\\.txt).*)'],
}
