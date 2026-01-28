import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = new URL(req.url);
  const pParam = url.searchParams.get('p');

  // কেবল ?p=marks থাকলে পাসওয়ার্ড চাইবে
  if (pParam === 'marks') {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === 'admin' && pass === '12345') {
      return NextResponse.next();
    }

    return new NextResponse('Wrong Password!', { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
