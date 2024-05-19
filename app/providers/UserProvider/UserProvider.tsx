'use client';

import { User, UserContext, useMagicContext } from '@/app/contexts';
import { MagicUserMetadata, RPCError, RPCErrorCode } from 'magic-sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Provider component that wraps parts of the app requiring user context.
 * @param {Object} props - React component properties.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} - JSX element representing the user context provider.
 */
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { magic } = useMagicContext();
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * Function to log in a user with Magic SDK.
   * @param {string} email - User's email address.
   * @returns {Promise<void>} - Resolves once the login process is complete.
   */
  const login = useCallback(
    async (email: string) => {
      if (!magic) return;

      try {
        await magic.auth.loginWithEmailOTP({ email });
        const userMetadata: MagicUserMetadata = await magic.user.getInfo();
        setUser(userMetadata);
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof RPCError) {
          switch (error.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              // Handle errors accordingly :)
              break;
          }
        } else {
          console.error('Login error:', error);
        }
      }
    },
    [magic]
  );

  /**
   * Function to log out the currently authenticated user.
   * @returns {Promise<void>} - Resolves once the logout process is complete.
   */
  const logout = useCallback(async () => {
    if (!magic) return;

    try {
      await magic.user.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [magic]);

  useEffect(() => {
    /**
     * Check the authentication status and load user data on component mount.
     */
    const checkAuthentication = async () => {
      setIsLoading(true);
      if (!magic) {
        return;
      }

      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          const userData = await magic.user.getInfo();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, [magic]);

  /**
   * Memoized user context value to avoid unnecessary re-renders.
   * @type {UserContextType}
   */
  const userContextValue = useMemo(() => {
    return { user, isAuthenticated, isLoading, login, logout };
  }, [user, isAuthenticated, isLoading, login, logout]);

  /**
   * Render the user context provider with the provided context value.
   */
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
