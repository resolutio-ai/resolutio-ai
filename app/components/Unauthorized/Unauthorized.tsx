'use client';

import { RenderOnAnonymous } from '@/app/components';
import Image from 'next/image';
import { FC } from 'react';

const Unauthorized: FC = () => {
  return (
    <RenderOnAnonymous>
      <div className='res-container my-10'>
        <div className='flex justify-center'>
          <Image
            src='401.svg'
            alt='401 Not authorized!'
            width={500}
            height={500}
          />
        </div>
        <div className='text-center'>
          <h1 className='my-10 text-3xl font-bold'>
            {'Please login to access this page!'}
          </h1>
        </div>
      </div>
    </RenderOnAnonymous>
  );
};

export default Unauthorized;
