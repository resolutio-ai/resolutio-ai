'use client';

import { FeedItem, FeedPost, Search } from '@/app/components';
import { FC } from 'react';

const Feed: FC = () => {
  return (
    <div className='w-5/6 flex-1'>
      <Search placeholder={''} />
      <div className='align-center md:align-center my-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:justify-center md:gap-10'>
        {FeedPost.map((feed) => (
          <FeedItem key={feed.id} feed={feed} />
        ))}
      </div>
    </div>
  );
};
export default Feed;
