"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  getStoredToken,
  setStoredToken,
  removeStoredToken,
} from "../_utils/storage";
import { AuthContextType, User } from "../_types/auth.types";

/**
 * `AuthContext` provides authentication-related state and functions to manage user authentication.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * `AuthProvider` is a context provider for authentication management.
 * It maintains user authentication state, handles login/logout, and fetches user data.
 *
 * @component
 * @returns {JSX.Element} A context provider wrapping the application.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  /**
   * Checks authentication status when the component mounts.
   * If a valid token exists, it fetches user data; otherwise, it sets `loading` to `false`.
   */
  useEffect(() => {
    const checkAuthStatus = async (): Promise<void> => {
      const token = getStoredToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<User>("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        removeStoredToken();
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Handles user login by storing the token and fetching the user profile.
   *
   * @param {string} token - The authentication token received from the login API.
   */
  const login = (token: string): void => {
    setStoredToken(token);
    setIsAuthenticated(true);
    fetchUserProfile();
  };

  /**
   * Handles user logout by clearing the token, resetting user state, and redirecting to login.
   */
  const logout = async (): Promise<void> => {
    try {
      const token = getStoredToken();
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeStoredToken();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  /**
   * Fetches the authenticated user's profile data from the API.
   * If fetching fails, it triggers logout.
   */
  const fetchUserProfile = async (): Promise<void> => {
    try {
      const token = getStoredToken();
      const response = await axios.get<User>("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
      logout();

    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider };
