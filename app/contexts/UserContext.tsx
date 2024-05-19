'use client';

import { MagicUserMetadata } from 'magic-sdk';
import React, { createContext, useContext } from 'react';

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
export const UserContext = createContext<UserContextType>({
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
