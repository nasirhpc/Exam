import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl } = req;
  const pParam = nextUrl.searchParams.get('p');

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

    // এখানে আপনার পছন্দের ইউজার এবং পাসওয়ার্ড দিন
    if (user === 'admin' && pass === 'e134209hpc') {
      return NextResponse.next();
    }

    return new NextResponse('ভুল পাসওয়ার্ড!', { status: 401 });
  }

  // অন্য সব প্যারামিটারের জন্য পাসওয়ার্ড লাগবে না
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // মেইন পেজের প্যারামিটার চেক করবে
};
