'use client';

import { NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY } from '@/app/settings';
import { Magic } from 'magic-sdk';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Type representing the context for the Magic SDK instance.
 * @typedef {Object} MagicContextType
 * @property {Magic | null} magic - The Magic SDK instance or null if not initialized.
 */
type MagicContextType = {
  magic: Magic | null;
};

/**
 * Context to provide the Magic SDK instance to components.
 * @type {React.Context<MagicContextType>}
 */
const MagicContext = createContext<MagicContextType>({
  magic: null,
});

/**
 * Hook to access the Magic SDK context.
 * @returns {MagicContextType} - The Magic SDK context.
 */
export const useMagicContext = () => useContext(MagicContext);

/**
 * Provider component to initialize and provide the Magic SDK instance to the context.
 * @param {Object} props - React component properties.
 * @param {ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} - JSX element representing the Magic SDK provider.
 */
export const MagicProvider = ({ children }: { children: ReactNode }) => {
  /**
   * State hook to manage the Magic SDK instance.
   * @type {[Magic | null, (magic: Magic | null) => void]}
   */
  const [magic, setMagic] = useState<Magic | null>(null);

  /**
   * Effect to initialize the Magic SDK instance on component mount.
   */
  useEffect(() => {
    if (NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
      // Create a new instance of Magic and set it in the state.
      const magicInstance = new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
        deferPreload: true,
      });
      setMagic(magicInstance);
    }
  }, []);

  /**
   * Memoized context value to avoid unnecessary re-renders.
   * @type {MagicContextType}
   */
  const magicContextValue = useMemo(() => {
    return {
      magic,
    };
  }, [magic]);

  /**
   * Render the Magic SDK provider with the provided context value.
   */
  return (
    <MagicContext.Provider value={magicContextValue}>
      {children}
    </MagicContext.Provider>
  );
};
