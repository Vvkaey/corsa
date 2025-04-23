// src/app/api/user/status/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  // Return a specific response for unauthenticated users instead of error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ 
      authenticated: false,
      badge: 0,  // Default to WINGMAN
      sessions: { available: 0 },
      subscription: null
    }, { status: 200 }); // Return 200 with default data instead of 401
  }
  
  try {
    const response = await fetch('https://corsa-backend-seven.vercel.app/api/users/status', {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Handle backend errors gracefully
      return NextResponse.json({ 
        authenticated: false,
        badge: 0,
        sessions: { available: 0 },
        subscription: null
      }, { status: 200 });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    // Return default data instead of error
    return NextResponse.json({ 
      authenticated: false,
      badge: 0,
      sessions: { available: 0 },
      subscription: null
    }, { status: 200 });
  }
}