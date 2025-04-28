import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// Make the API call to the external service
const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {

        // Parse the request body
        const formData = await request.json();

        // Calling actual backend API endpoint
        const response = await fetch(`${apiUrl}/api/users/details`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { 'Authorization': authHeader })
            },
            body: JSON.stringify(formData),
        });

        // Get the response data
        const data = await response.json();

        // Return the response from backend
        return NextResponse.json(data, { status: response.status });


    } catch (error) {
        console.error('Proxy error:', error);
        // Return default data with status 200 to maintain consistency in API response
        return NextResponse.json(
            { success: false, message: 'Failed to store user details' }, 
            { status: 200 }
          );
    }


}

// This configures the route to accept requests from specific HTTP methods
export const dynamic = 'force-dynamic'; // Makes this route dynamically rendered