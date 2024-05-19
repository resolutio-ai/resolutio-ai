'use client';

import { useUserContext } from '@/app/contexts';
import { FC, PropsWithChildren } from 'react';

const RenderOnAuthenticated: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? children : null;
};

export default RenderOnAuthenticated;
