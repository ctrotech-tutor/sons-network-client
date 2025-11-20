// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'; // Our server-side Firebase helper

export async function middleware(request: NextRequest) {
  // 1. Get the session cookie from the user's browser.
  const sessionCookie = request.cookies.get('session')?.value;

  // If there is no session cookie, the user is not logged in.
  if (!sessionCookie) {
    // If they are trying to access a protected route, redirect to login.
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Otherwise, let them continue.
    return NextResponse.next();
  }

  // 2. Verify the session cookie with Firebase Admin.
  try {
    // This line checks if the "Golden Ticket" is valid.
    await adminAuth.verifySessionCookie(sessionCookie, true);

    // 3. The user is authenticated. Handle redirects for logged-in users.
    // If a logged-in user tries to visit the login or signup page...
    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')) {
      // ...redirect them to their dashboard.
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If they are accessing any other page, let them continue.
    return NextResponse.next();

  } catch (error) {
    // 4. The session cookie is invalid (expired, tampered with, etc.).
    console.error('Session cookie verification failed:', error);

    // Clear the invalid cookie from the browser.
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('session', '', { expires: new Date(0) });
    
    // If they were trying to access a protected route, the redirect to /login is correct.
    // If they were on a public page, they will be redirected to login, which is safe.
    return response;
  }
}

// This config specifies that the middleware should run on all routes
// except for static files and images.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
