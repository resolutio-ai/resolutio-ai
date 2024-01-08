import Image from 'next/image';
import { FC } from 'react';
import monalisaart from '../../assets/evidence-sideimg.png';

const SideImage: FC = () => {
  return (
    <div className='relative'>
      <Image
        src={monalisaart}
        alt='monalisa'
        className='h-[calc(100vh-64px)] w-[100%] object-cover object-center'
      />
      <p className='absolute bottom-10 right-20 flex w-[180px] cursor-pointer justify-center rounded-sm bg-white p-4 px-3 py-2 text-sm text-primary shadow-lg'>
        Artist details link
      </p>
    </div>
  );
};
export default SideImage;
