import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Public routes that don't require authentication
  const publicPaths = [
    '/',
    '/auth/signin',
    '/auth/register',
    '/auth/error',
    '/properties',
    '/api/auth',
  ];

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => {
    // Handle root path
    if (path === '/' && pathname === '/') return true;
    // Handle nested paths
    return pathname.startsWith(path);
  });

  // If the user is trying to access a public path while logged in, redirect to dashboard
  if (token && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If there's no token and the path is not public, redirect to signin
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check user role for protected routes
  const userRole = token.role as string;
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect lawyer routes
  if (pathname.startsWith('/lawyer') && userRole !== 'LAWYER') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user has the required role, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
