// app/api/submit-mentor-application/route.ts
import { NextRequest, NextResponse } from 'next/server';

    // Make the API call to the external service
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    // Get auth token from request headers if available
    const authHeader = request.headers.get('Authorization') || '';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    
    // Call your actual backend API endpoint
    const response = await fetch(`${apiUrl}/api/mentors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader })
      },
      body: JSON.stringify(formData),
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the response from your backend
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in submit-mentor-application middleware:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' }, 
      { status: 500 }
    );
  }
}

// Optional: Add a handler for other methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' }, 
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' }, 
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' }, 
    { status: 405 }
  );
}

// This configures the route to accept requests from specific HTTP methods
export const dynamic = 'force-dynamic'; // Makes this route dynamically rendered