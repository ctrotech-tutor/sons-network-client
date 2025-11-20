// app/actions/auth.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuth } from '@/lib/firebase-admin' // Our server-side Firebase helper

/**
 * Creates a session cookie for the authenticated user.
 * This is the "Golden Ticket" that our server will use.
 * @param idToken The ID token provided by the Firebase client SDK after login.
 */
export async function createSessionCookie(idToken: string) {
  // The session cookie will expire in 7 days.
  const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

  // Set the secure, HTTP-only session cookie in the browser.
  cookies().set('session', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: expiresIn,
    path: '/',
  } );

  // After setting the cookie, redirect to the admin dashboard.
  return redirect('/admin');
}

/**
 * Signs the user out by clearing the session cookie.
 */
export async function signOut() {
  // Clear the session cookie.
  cookies().set('session', '', { expires: new Date(0) });
  
  // Redirect to the login page.
  return redirect('/login');
}
