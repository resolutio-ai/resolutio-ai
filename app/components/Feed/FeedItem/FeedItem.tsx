'use client';
import {
  AddIcon,
  BookmarkIcon,
  ElllipseIcon,
  EyeIcon,
  LicenseIcon,
  SaveIcon,
} from '@/app/assets';
import { Feed } from '@/app/services/cms.service';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import FeedType from '../FeedType/FeedType';

interface FeedItemProps {
  feed: Feed;
}

const FeedItem: FC<FeedItemProps> = ({ feed }) => {
  const { creator, work } = feed;
  return (
    <div className='flex shrink-0 flex-col items-start justify-start border-b border-gray-400'>
      <div className='creator-container mb-2 flex w-[100%] items-center justify-between'>
        <div className='flex items-center'>
          <div className='avatar mr-2'>
            <div className='w-8 rounded-full'>
              <Image
                src={creator.image}
                width={25}
                height={25}
                alt={creator.name}
              />
            </div>
          </div>
          <span className='name mr-2 font-bold'>{creator.name}</span>
          <span className='timestamp text-sm text-slate-500'>5h</span>
        </div>
        <div>
          <ElllipseIcon />
        </div>
      </div>
      <div className='img-container relative w-[100%]'>
        <Image
          src={work.url}
          alt={work.description}
          width={500}
          height={500}
          className='w-[100%] rounded-md'
        />
        <FeedType type={work.type} />
      </div>
      <div className='my-4 flex w-[100%] justify-between'>
        <div className='info-container flex gap-5'>
          <div className='views-container flex items-center'>
            <EyeIcon />
            <span className='ml-2 text-[13px]'>
              {feed.views}
              <span className='ml-1 hidden sm:hidden md:inline'>views</span>
            </span>
          </div>
          <div className='license-container flex items-center'>
            <LicenseIcon />
            <span className='ml-2 text-[13px]'>
              {feed.licenses}
              <span className='ml-1 hidden sm:hidden md:inline'>licenses</span>
            </span>
          </div>
        </div>
        <div className='action-container flex gap-4'>
          <BookmarkIcon />
          <SaveIcon />
          <AddIcon />
        </div>
      </div>
      <div className='flex w-[100%] flex-wrap items-center justify-between gap-4 sm:flex-nowrap'>
        <p className='description text-sm text-gray-700 sm:w-[50%]'>
          {work.description}
        </p>
        <Link
          href='#'
          className='code-link rounded-md border border-primary bg-[#5F437F] px-3 py-1 text-sm leading-6 tracking-tight text-white'
        >
          {feed.code}
        </Link>
      </div>
      <Link
        href='#'
        className='view-more my-4 text-sm font-medium text-primary'
      >
        View more details
      </Link>
    </div>
  );
};

export default FeedItem;
