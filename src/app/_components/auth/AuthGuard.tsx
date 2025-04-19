"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../_contexts/AuthContext';
import { AuthProgress } from './AuthProgress';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * `AuthGuard` is a component that protects authenticated routes.
 * It checks if the user is authenticated before allowing access to its children.
 * 
 * - If the authentication state is **loading**, it displays the AuthProgress component.
 * - If the user is **not authenticated**, they are redirected to the login page.
 * - If the user **is authenticated**, the component renders its children.
 *
 * @param {AuthGuardProps} props - The props for the `AuthGuard` component.
 * @returns {JSX.Element | null} The rendered children if authenticated, otherwise `null`.
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and the user isn't authenticated
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  // Show loading state while checking authentication
  if (loading) {
    return <AuthProgress />;
  }

  // If not authenticated and not loading, don't render children
  // The useEffect will handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;