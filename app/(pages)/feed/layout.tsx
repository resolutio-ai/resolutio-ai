'use client';

import { RenderOnAuthenticated, Sidebar, Unauthorized } from '@/app/components';
import { FC, PropsWithChildren } from 'react';

const FeedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <RenderOnAuthenticated>
        <div className='feed-container flex gap-2 px-2 pt-4 md:px-4'>
          <Sidebar />
          {children}
        </div>
      </RenderOnAuthenticated>
      <Unauthorized />
    </>
  );
};

export default FeedLayout;
