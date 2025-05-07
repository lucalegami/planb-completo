import { NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/home',
  '/dashboard',
  '/proposte',
  '/radar',
  '/crypto',
  '/segnali-wall-street'
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const requiresAuth = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (requiresAuth && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('denied', '1');
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
