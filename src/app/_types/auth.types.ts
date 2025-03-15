export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
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
