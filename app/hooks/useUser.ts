'use client';

import { NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY } from '@/app/settings';
import { Magic, MagicUserMetadata } from 'magic-sdk';
import { useCallback, useEffect, useState } from 'react';

export type User = {
  isLoading: boolean;
  isAuthenticated: boolean;
  metadata: MagicUserMetadata | null;
};

export const userInitialState = {
  metadata: null,
  isLoading: true,
  isAuthenticated: false,
};

const createMagic = (key: string): Magic | false => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a publishable key
  return (
    typeof window !== 'undefined' && new Magic(`${key}`, { deferPreload: true })
  );
};

// Pass in your publishable key from your .env file
export const magic: Magic | false = createMagic(
  NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
);

export const useUser = () => {
  const [user, setUser] = useState<User>(userInitialState);

  const login = useCallback(async (email: string) => {
    if (!magic) return;

    // Log in using our email with Magic and store the returned DID token in a variable
    //openBackdrop('Check your email...');

    try {
      await magic.auth.loginWithEmailOTP({
        email,
      });
      const userMetadata: MagicUserMetadata = await magic.user.getInfo();
      setUser((prev) => ({
        ...prev,
        metadata: userMetadata,
        isAuthenticated: true,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      //closeBackdrop();
    }
  }, []);

  const logout = useCallback(async () => {
    if (!magic) return;
    // Call Magic's logout method, reset the user state, and route to the login page
    //openBackdrop('Logging out...');
    try {
      await magic.user.logout();
      setUser((prev) => ({ ...prev, metadata: null, isAuthenticated: false }));
    } catch (error) {
    } finally {
      //closeBackdrop();
    }
  }, []);

  const resetUser = useCallback(() => {
    setUser(userInitialState);
  }, []);

  useEffect(() => {
    // If the Magic instance hasn't been set, do nothing
    if (!magic) {
      resetUser();
      return;
    }

    // Set loading to true to display our loading message within pages/index.js
    setUser((prev) => ({ ...prev, isLoading: true }));

    // Check if the user is authenticated already
    magic.user
      .isLoggedIn()
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          // Pull their metadata, update our state, and route to dashboard
          magic.user.getInfo().then((userData) =>
            setUser((prev) => ({
              ...prev,
              metadata: userData,
              isAuthenticated: true,
              isLoading: false,
            }))
          );
        } else {
          // If false, route them to the login page and reset the user state
          resetUser();
        }
      })
      .finally(() => {
        setUser((prev) => ({ ...prev, isLoading: false }));
      });
    // Add an empty dependency array so the useEffect only runs once upon page load
  }, [resetUser]);

  return { user, login, logout };
};
