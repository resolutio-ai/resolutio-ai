'use client';

import { queryClient } from '@/app/settings';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
