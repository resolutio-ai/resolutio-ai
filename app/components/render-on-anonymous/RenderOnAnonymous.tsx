import { useUserContext } from '@/app/contexts';
import { PropsWithChildren } from 'react';

export const RenderOnAnonymous = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useUserContext();
  return !isAuthenticated ? children : null;
};
