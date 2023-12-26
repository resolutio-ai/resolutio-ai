'use client';

import { MagicUserMetadata } from 'magic-sdk';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMagicContext } from '.';

/**
 * Type representing the user's metadata.
 * @typedef {Object} User
 * @property {string} email - User's email address.
 * @property {string} issuer - User's issuer information.
 * @property {string} publicAddress - User's public address.
 * @property {string} [metadata] - Additional user metadata.
 */
export type User = MagicUserMetadata | null;

/**
 * Type representing the context for user data.
 * @typedef {Object} UserContextType
 * @property {User} user - The user object.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {boolean} isLoading - Indicates whether user data is still loading.
 * @property {(email: string) => Promise<void>} [login] - Function to login with an email.
 * @property {() => Promise<void>} [logout] - Function to logout.
 */
type UserContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login?: (email: string) => Promise<void>;
  logout?: () => Promise<void>;
};

/**
 * Context to provide and manage user data.
 * @type {React.Context<UserContextType>}
 */
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (email: string) => {},
  logout: async () => {},
});

/**
 * Custom hook for accessing user context data.
 * @returns {UserContextType} - The user context data.
 */
export const useUserContext = () => useContext(UserContext);

/**
 * Provider component that wraps parts of the app requiring user context.
 * @param {Object} props - React component properties.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} - JSX element representing the user context provider.
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
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
        console.error('Login error:', error);
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
