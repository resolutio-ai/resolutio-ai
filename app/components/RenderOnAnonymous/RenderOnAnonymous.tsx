import { useUserContext } from '@/app/contexts';
import { PropsWithChildren } from 'react';

const RenderOnAnonymous = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useUserContext();
  return !isAuthenticated ? children : null;
};

export default RenderOnAnonymous;
