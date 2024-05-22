'use client';

import { Magic } from 'magic-sdk';
import { createContext, useContext } from 'react';

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
export const MagicContext = createContext<MagicContextType>({
    magic: null,
});

/**
 * Hook to access the Magic SDK context.
 * @returns {MagicContextType} - The Magic SDK context.
 */
export const useMagicContext = () => useContext(MagicContext);