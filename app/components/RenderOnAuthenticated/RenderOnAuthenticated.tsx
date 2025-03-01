'use client';

import { useUserContext } from '@/app/contexts';
import { PropsWithChildren } from 'react';
import Loader from '../Loader/Loader';
import Unauthorized from '../Unauthorized/Unauthorized';

const RenderOnAuthenticated = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isProfileLoading } = useUserContext();

  if (isProfileLoading) return <Loader />;

  return isAuthenticated ? children : <Unauthorized />;
};

export default RenderOnAuthenticated;
