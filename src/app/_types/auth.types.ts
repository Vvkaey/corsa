export interface User {
  id: string;
  name?: string;
  email: string;
  profilePicture?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  requestOTP: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  // login: (token: string) => void;
  logout: () => void;
  // fetchUserProfile: () => Promise<void>;
}

export interface AuthGuardProps {
  children: React.ReactNode;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}
