import { PropsWithChildren } from 'react';

export const AlignCenter = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-[100%] flex-col items-center justify-center'>
      {children}
    </div>
  );
};
