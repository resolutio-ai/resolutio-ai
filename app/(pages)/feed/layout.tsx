'use client';

import { Sidebar } from '@/app/components';
import { queryClient } from '@/app/settings';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

const FeedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='feed-container flex gap-2 px-2 pt-4 md:px-4'>
        <Sidebar />
        {children}
      </div>
    </QueryClientProvider>
  );
};

export default FeedLayout;
