'use client';

import { useUserContext } from '@/app/contexts';
import { PropsWithChildren } from 'react';
import { Loader } from '../loader/Loader';
import { Unauthorized } from '../unauthorized/Unauthorized';

export const RenderOnAuthenticated = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isProfileLoading } = useUserContext();

  if (isProfileLoading) return <Loader />;

  return isAuthenticated ? children : <Unauthorized />;
};
