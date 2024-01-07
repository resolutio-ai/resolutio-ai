import { FC } from 'react';

const FeedItemSkeleton: FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-4'>
        <div className='skeleton h-8 w-8 shrink-0 rounded-full'></div>
        <div className='skeleton h-4 w-20'></div>
      </div>
      <div className='skeleton h-[450px] w-full'></div>
      <div className='flex items-center justify-between'>
        <div className='skeleton h-6 w-[25%]'></div>
        <div className='skeleton h-6 w-[30%]'></div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='skeleton h-16 w-[40%]'></div>
        <div className='skeleton h-10 w-24'></div>
      </div>
      <div className='skeleton h-6 w-[25%]'></div>
    </div>
  );
};

const FeedSkeleton: FC = () => {
  return (
    <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3'>
      {[1, 2, 3].map((id) => (
        <FeedItemSkeleton key={id} />
      ))}
    </div>
  );
};

export default FeedSkeleton;
