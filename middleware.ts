
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that require authentication (for informational purposes only)
// We'll use this to set a header that our client components can read
const protectedPaths = ['/dashboard'];



export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Clone the response
  const response = NextResponse.next();
  
  // Keep the existing custom header functionality
  response.headers.set('x-pathname', pathname);

  // Set a header indicating if this is a protected path
  // Client components can use this information if needed
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    response.headers.set('x-protected-route', 'true');
  }
  
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, images, and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};