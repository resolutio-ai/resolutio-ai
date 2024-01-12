'use client';

import { FeedItem, FeedSkeleton, Search } from '@/app/components';
import { useFeeds } from '@/app/hooks';
import { FC } from 'react';

const FeedPage: FC = () => {
  const { data: feeds, isLoading } = useFeeds();
  return (
    <div className='w-5/6 flex-1'>
      <Search />
      {isLoading ? (
        <FeedSkeleton />
      ) : (
        <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3'>
          {feeds?.map((feed) => <FeedItem key={feed.id} feed={feed} />)}
        </div>
      )}
    </div>
  );
};
export default FeedPage;