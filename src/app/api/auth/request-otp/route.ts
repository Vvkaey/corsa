// app/api/auth/request-otp/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Log incoming request for debugging
    console.log("Request received in API route");
    
    // Parse the request body
    const body = await request.json().catch(e => {
      console.error("Failed to parse JSON:", e);
      return {};
    });
    
    const { email } = body;
    
    // Validate input
    if (!email) {
      console.error("Missing email in request");
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    
    console.log(`Attempting to send OTP to: ${email}`);
    
    // Make sure your API URL is correctly defined
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("API_URL is not defined in environment variables");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }
    
    // Call external API
    const response = await fetch(`${apiUrl}/api/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    
    // Log response status for debugging
    console.log(`External API responded with status: ${response.status}`);
    
    const data = await response.json().catch(e => {
      console.error("Failed to parse API response:", e);
      return { message: "Invalid response from server" };
    });
    
    if (!response.ok) {
      console.error("External API error:", data);
      return NextResponse.json(
        { message: data.message || "Failed to send OTP" },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    // Log the full error for debugging
    console.error("Unhandled error in API route:", error);
    
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}