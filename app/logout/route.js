// app/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  response.cookies.set('isLoggedIn', 'false', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
  });
  return response;
}
