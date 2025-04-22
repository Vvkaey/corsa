
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/settings']

// Define paths that are for authentication
const authPaths = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Clone the response
  const response = NextResponse.next();
  
  // Keep the existing custom header functionality
  response.headers.set('x-pathname', pathname);
  
  // Check if the user is authenticated by looking for the auth token
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!token;
  
  // If user is trying to access a protected path and is not authenticated
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    
    // Pass the intended destination as a query parameter
    url.searchParams.set('redirect', pathname);
    
    return NextResponse.redirect(url);
  }
  
  // If user is already authenticated and trying to access auth pages
  if (authPaths.some(path => pathname === path) && isAuthenticated) {
    const url = request.nextUrl.clone();
    
    // Get redirect parameter from URL if it exists
    const redirectPath = request.nextUrl.searchParams.get('redirect') || '/';
    url.pathname = redirectPath;
    
    return NextResponse.redirect(url);
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};