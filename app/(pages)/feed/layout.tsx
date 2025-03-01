'use client';

import { RenderOnAuthenticated, Sidebar } from '@/app/components';
import { PropsWithChildren } from 'react';

const FeedLayout = ({ children }: PropsWithChildren) => {
  return (
    <RenderOnAuthenticated>
      <div className='feed-container flex gap-2 px-2 pt-4 md:px-4'>
        <Sidebar />
        {children}
      </div>
    </RenderOnAuthenticated>
  );
};

export default FeedLayout;
