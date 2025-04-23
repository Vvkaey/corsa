
export interface UserStatus {
    badge: number;
    sessions: {
      available: number;
    };
    subscription: {
      active: boolean;
      daysRemaining: number;
    } | null;
  }