'use client';

import { useUserContext } from '@/app/contexts';
import { PropsWithChildren } from 'react';

const RenderOnAuthenticated = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? children : null;
};

export default RenderOnAuthenticated;
