
import { NextResponse } from 'next/server';
import type { UserStatus } from '@/app/_types/user_status.types';

/**
 * GET handler for user status
 * In the App Router, we export named functions for each HTTP method
 */
export async function GET() {
  // In a real application, this would come from a database or auth service
  const userStatus: UserStatus = {
    badge: 2, // This value is redundant as we calculate it from sessions and subscription
    sessions: {
      available: 0,
    },
    subscription: {
      active: false,
      daysRemaining: 0,
    },
  };

  // Return the response using NextResponse
  return NextResponse.json(userStatus);
}