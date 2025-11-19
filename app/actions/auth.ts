// app/actions/auth.ts
'use server';

import { redirect } from 'next/navigation';
// 1. IMPORTANT: Import crea instead of your custom createClient
import { crea } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { CookieOptions } from '@supabase/ssr';

/**
 * Server Action to sign in a user with their email and password.
 * On failure, it redirects back to the login page with an error message.
 * On success, it redirects to the admin dashboard.
 */
export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // 2. Create the Supabase client *for a Server Action*
  const cookieStore = cookies();
  const supabase = crea({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Use a more generic error message for security
    return redirect(`/login?error=Could+not+authenticate+user`);
  }

  // A successful login will be handled by the middleware,
  // which will redirect appropriately. Redirecting here is a good fallback.
  return redirect('/admin');
}

/**
 * Server Action to initiate the Google OAuth sign-in flow.
 * It gets the OAuth URL from Supabase and redirects the user to it.
 */
export async function signInWithGoogle() {
  // 3. Create the client again for this action
  const cookieStore = cookies();
  const supabase = crea({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // The URL the user will be sent back to after they approve the login.
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('Google sign in error:', error);
    return redirect(`/login?error=Could+not+authenticate+with+Google`);
  }

  // Redirect the user to the Google authentication page.
  if (data.url) {
    return redirect(data.url);
  }

  // Fallback redirect in case something goes wrong.
  return redirect('/login?error=An+unexpected+error+occurred');
}

/**
 * Server Action to sign the user out.
 */
export async function signOut() {
  // 4. And create the client one more time for the sign-out action
  const cookieStore = cookies();
  const supabase = crea({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  await supabase.auth.signOut();
  return redirect('/login');
}
