import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/login', '/auth/signup']

  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (token && (path === '/auth/login' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL('/agents', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/agents/:path*',
    '/workflows/:path*',
    '/settings/:path*',
    '/auth/login',
    '/auth/signup'
  ]
}