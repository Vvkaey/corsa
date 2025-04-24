import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the Authorization token from the headers
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the request body
    const body = await request.json();
    const { paymentId, orderId, signature } = body;
    
    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        { message: 'Payment ID, Order ID and Signature are required' }, 
        { status: 400 }
      );
    }
    
    // Make the API call to the external service
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    const response = await fetch(`${apiUrl}/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({ 
        paymentId, 
        orderId, 
        signature
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Payment verification failed' }, 
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}