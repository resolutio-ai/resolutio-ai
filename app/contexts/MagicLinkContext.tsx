'use client';

import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useUser } from '../hooks';
import { User, userInitialState } from '../hooks/useUser';

type ContextState = {
  user: User;
  login?: (email: string) => Promise<void>;
  logout?: () => Promise<void>;
};

const contextInitialState: ContextState = {
  user: userInitialState,
};

export const MagicLinkContext =
  createContext<ContextState>(contextInitialState);

export const MagicLinkContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const userProviderState = useUser();

  return (
    <MagicLinkContext.Provider value={userProviderState}>
      {children}
    </MagicLinkContext.Provider>
  );
};

export const useMagicLinkContext = () => {
  return useContext(MagicLinkContext);
};
