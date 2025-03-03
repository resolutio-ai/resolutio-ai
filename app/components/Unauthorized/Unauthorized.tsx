'use client';

import Image from 'next/image';
import AlignCenter from '../AlignCenter/AlignCenter';
import RenderOnAnonymous from '../RenderOnAnonymous/RenderOnAnonymous';

const Unauthorized = () => {
  return (
    <RenderOnAnonymous>
      <AlignCenter>
        <Image
          src='401.svg'
          alt='401 Not authorized!'
          width={400}
          height={400}
        />
        <h1 className='my-10 text-xl'>{'Please login to access this page!'}</h1>
      </AlignCenter>
    </RenderOnAnonymous>
  );
};

export default Unauthorized;
