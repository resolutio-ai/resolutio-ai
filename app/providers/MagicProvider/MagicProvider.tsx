'use client';

import { MagicContext } from '@/app/contexts';
import { NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY } from '@/app/settings';
import { Magic } from 'magic-sdk';
import { ReactNode, useEffect, useMemo, useState } from 'react';

/**
 * Provider component to initialize and provide the Magic SDK instance to the context.
 * @param {Object} props - React component properties.
 * @param {ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} - JSX element representing the Magic SDK provider.
 */
const MagicProvider = ({ children }: { children: ReactNode }) => {
  /**
   * State hook to manage the Magic SDK instance.
   * @type {[Magic | null, (magic: Magic | null) => void]}
   */
  const [magic, setMagic] = useState<Magic | null>(null);

  /**
   * Effect to initialize the Magic SDK instance on component mount.
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
      // Create a new instance of Magic and set it in the state.
      const magicInstance = new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
        deferPreload: true
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
      magic
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

export default MagicProvider;
