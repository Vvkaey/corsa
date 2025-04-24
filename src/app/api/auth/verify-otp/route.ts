// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Log incoming request for debugging
    console.log("Verify OTP request received");
    
    // Parse the request body
    const body = await request.json().catch(e => {
      console.error("Failed to parse JSON:", e);
      return {};
    });
    
    const { email, otp } = body;
    
    // Validate input
    if (!email || !otp) {
      console.error("Missing email or OTP in request");
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }
    
    console.log(`Attempting to verify OTP for: ${email}`);
    
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
    const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
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
        { message: data.message || "Failed to verify OTP" },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    // Log the full error for debugging
    console.error("Unhandled error in verify-otp API route:", error);
    
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}