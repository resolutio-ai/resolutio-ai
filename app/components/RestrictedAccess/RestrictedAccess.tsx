import Image from 'next/image';
import AlignCenter from '../AlignCenter/AlignCenter';

const RestrictedAccess = () => {
  return (
    <AlignCenter>
      <Image
        src='restricted.svg'
        alt='Restricted Access Image'
        width={400}
        height={400}
      />
      <h2 className='my-10 text-xl'>
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
    </AlignCenter>
  );
};

export default RestrictedAccess;
