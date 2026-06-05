import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

const protectedMiddleware = auth.middleware({ loginUrl: '/sign-in' });

export default async function middleware(request: NextRequest) {
  // Server actions POST to the page URL with a Next-Action header.
  // Letting auth middleware intercept them causes an HTML redirect response
  // instead of the expected JSON, triggering "unexpected response" in the browser.
  if (request.headers.has('next-action')) {
    return NextResponse.next();
  }
  return protectedMiddleware(request);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
