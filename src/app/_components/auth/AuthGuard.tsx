"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../_contexts/AuthContext';
import { AuthProgress } from './AuthProgress';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  /**
   * If true, will append the current path as a redirect parameter
   * Example: /login?redirect=/dashboard
   */
  saveCurrentPath?: boolean;
}

/**
 * `AuthGuard` is a component that protects authenticated routes.
 * It checks if the user is authenticated before allowing access to its children.
 * 
 * - If the authentication state is **loading**, it displays the AuthProgress component.
 * - If the user is **not authenticated**, they are redirected to the login page.
 * - If the user **is authenticated**, the component renders its children.
 * - Can save the current path for redirect after login when `saveCurrentPath` is true.
 *
 * @param {AuthGuardProps} props - The props for the `AuthGuard` component.
 * @returns {JSX.Element | null} The rendered children if authenticated, otherwise `null`.
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/login',
  saveCurrentPath = true
}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're not loading and the user isn't authenticated
    if (!loading && !isAuthenticated) {
      if (saveCurrentPath) {
        // Redirect to login with the current path as a parameter
        router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
      } else {
        // Redirect to login without a redirect parameter
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, loading, router, redirectTo, pathname, saveCurrentPath]);

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
