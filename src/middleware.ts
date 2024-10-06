import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/'],
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/search', request.url))
  }

  return NextResponse.next()
}
