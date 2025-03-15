// src/components/auth/AuthGuard.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuardProps } from '../../_types/auth.types';
import { useAuth } from '@/app/_utils/hooks/useAuth';


/**
 * `AuthGuard` is a higher-order component that protects authenticated routes.
 * It checks if the user is authenticated before allowing access to its children.
 * 
 * - If the authentication state is **loading**, it displays a loading screen.
 * - If the user is **not authenticated**, they are redirected to the `/login` page.
 * - If the user **is authenticated**, the component renders its children.
 *
 * @param {AuthGuardProps} props - The props for the `AuthGuard` component.
 * @returns {JSX.Element | null} The rendered children if authenticated, otherwise `null`.
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;