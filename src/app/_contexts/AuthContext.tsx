"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
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
 */
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Start with loading as false since we're not making any API calls initially
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Function to load auth state from localStorage
  const loadAuthState = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user data:", error);

          // Create a minimal user object if parsing fails
          const minimalUser: User = {
            id: "google-user",
            email: "google@user.com",
          };

          setUser(minimalUser);
          localStorage.setItem("user", JSON.stringify(minimalUser));
        }
      } else {
        // If we have a token but no user, create a minimal user
        const minimalUser: User = {
          id: "google-user",
          email: "google@user.com",
        };

        setUser(minimalUser);
        localStorage.setItem("user", JSON.stringify(minimalUser));
      }
    } else {
      // Clear state if no token in localStorage
      setToken(null);
      setUser(null);
    }

    setLoading(false);
  };

  // Initialize auth state on component mount
  useEffect(() => {
    loadAuthState();
  }, []);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    // Function to handle storage events
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "authToken" || event.key === "user") {
        console.log("Auth storage changed, reloading auth state");
        loadAuthState();
      }
    };

    // Add a custom event for same-window updates
    const handleCustomStorageChange = () => {
      console.log("Custom storage event triggered, reloading auth state");
      loadAuthState();
    };

    // Add event listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-storage-change", handleCustomStorageChange);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "auth-storage-change",
        handleCustomStorageChange
      );
    };
  }, []);

  // Request OTP function
  const requestOTP = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Call your Next.js API route instead of external API directly
      const response = await fetch(`/api/auth/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send OTP");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP function
  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      console.log("Calling verify OTP API route with email:", email);
      const response = await fetch(`/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      // Log the response status
      console.log("API route responded with status:", response.status);

      // For 500 errors, try to get more details
      if (response.status === 500) {
        const errorText = await response.text();
        console.error("Server error details:", errorText);
        throw new Error("Server error: " + errorText);
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      // Set token and user data in state and localStorage
      setToken(data.data.token);
      setUser(data.data.user);

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      return true;
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      setError(error instanceof Error ? error.message : "Failed to verify OTP");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // First clear all states and storage
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Then trigger events to update dependent contexts
    if (window) {
      // Trigger auth context update event
      window.dispatchEvent(new Event("auth-storage-change"));
      
      // Trigger mentorship context update event
      window.dispatchEvent(new Event("mentorship-update"));
      
      // Finally refresh the page after a small delay to ensure events are processed
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated,
    error,
    requestOTP,
    verifyOTP,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthContext, AuthProvider };
