import Image from 'next/image';
import { FC } from 'react';

const RestrictedAccess: FC = () => {
  return (
    <div className='res-container'>
      <div className='my-10 flex justify-center'>
        <Image
          src='restricted.svg'
          alt='Restricted Access Image'
          width={500}
          height={500}
        />
      </div>
      <h2 className='mb-8 text-center text-2xl font-bold'>
        {
          'Restricted for early access pass holders. Apply for early access pass '
        }
        <a
          href='https://docs.google.com/forms/d/e/1FAIpQLSdFA8JiIw1Dnfmv8uRlnLnw8wSCiH3ENT7qO6I_pIMoTLaafQ/viewform'
          target='_blank'
          className='text-primary underline'
        >
          here
        </a>
        {'.'}
      </h2>
    </div>
  );
};

export default RestrictedAccess;
