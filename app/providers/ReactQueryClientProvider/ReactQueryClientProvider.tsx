'use client';

import { queryClient } from '@/app/settings';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
