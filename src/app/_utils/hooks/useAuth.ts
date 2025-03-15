import { useContext } from 'react';
import { AuthContext } from '../../_contexts/AuthContext';
import { AuthContextType } from '../../_types/auth.types';

/**
 * `useAuth` is a custom hook that provides access to authentication-related state and functions.
 * 
 * - It retrieves authentication context values from `AuthContext`.
 * - It ensures the hook is only used within an `AuthProvider`, throwing an error otherwise.
 *
 * @returns {AuthContextType} The authentication context containing user data and auth functions.
 *
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 *
 * @example
 * ```tsx
 * import { useAuth } from '../hooks/useAuth';
 * 
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * if (isAuthenticated) {
 *   console.log(`Welcome, ${user?.name}!`);
 * }
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
