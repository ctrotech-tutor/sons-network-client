// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // If a code is present in the URL, exchange it for a session.
  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    // If the exchange is successful (no error), redirect the user to the admin dashboard.
    if (!error) {
      return NextResponse.redirect(`${origin}/admin`)
    }
  }

  // If there is no code, or if the code exchange fails, redirect the user to an error state on the login page.
  // This is a safe fallback.
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
