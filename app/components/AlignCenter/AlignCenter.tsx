import { PropsWithChildren } from 'react';

const AlignCenter = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-[100%] flex-col items-center justify-center'>
      {children}
    </div>
  );
};

export default AlignCenter;
