import Image from 'next/image';
import monalisaart from '../../assets/unsplash_Kv1hYl9LlxU.png';

export default function SideImage() {
  return (
    <div className='relative h-full'>
      <Image
        src={monalisaart}
        alt='monalisa'
        className='h-full w-full object-cover object-center'
        
      />
      <p className='absolute bottom-10 right-20 flex w-[180px] cursor-pointer justify-center rounded-sm bg-white p-4 px-3 py-2 text-sm text-primary shadow-lg'>
        Artist details link
      </p>
    </div>
  );
}
