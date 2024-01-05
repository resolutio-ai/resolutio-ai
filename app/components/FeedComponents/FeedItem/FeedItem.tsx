'use client';
import {
  MoreIcon,
  booknnarkIcon,
  evidencForm,
  eyeIcon,
  messageIcon,
  usersIcon,
} from '@/app/assets/icons';
import { Feed } from '@/app/services/cms.service';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
interface FeedItemProps {
  feed: Feed;
}

const FeedItem: FC<FeedItemProps> = ({ feed }) => {
  const { creator, work } = feed;
  return (
    <div
      key={feed.id}
      className='flex shrink-0 flex-col items-start justify-start border-b border-gray-400 pb-5 pe-1 '
    >
      <div className='align-center flex w-[100%] items-center  justify-between gap-4  py-2'>
        <div className='flex items-center justify-between gap-2   '>
          <Image
            src={creator.image}
            alt={creator.name}
            width={25}
            height={25}
            className=' rounded-[50%]'
          />
          <p className='color-gray-700 font-dm-sans text-center text-base font-bold font-normal leading-6'>
            <strong>
              {creator.name}
              <span className='font-dmSans text-sm font-normal leading-5 text-slate-500'>
                . 5h
              </span>
            </strong>
          </p>
        </div>
        <div>
          <Image src={MoreIcon} className='cursor-pointer' alt='more' />
        </div>
      </div>

      <div className='relative w-[100%] '>
        <Image
          src={work.url}
          alt={work.description}
          width={500}
          height={500}
          className='h-447 w-[100%] shrink-0 rounded-md '
        />
        <div className='absolute right-[20px] top-[10px] flex w-[35px] cursor-pointer justify-center rounded-md  bg-info bg-white/25 p-2  backdrop-blur-sm transition duration-500 ease-in-out'>
          <Image src={''} alt={work.description} width={25} height={25} />
        </div>
      </div>

      <div className='align-center flex w-[100%] items-center  justify-between  py-2  '>
        <div className='flex gap-3'>
          <div className='align-end flex gap-2 '>
            <Image
              src={eyeIcon}
              alt='more'
              width={15}
              height={10}
              className='lg:h-6 lg:w-6'
            />
            <p className='text-#262626 font-400 leading-18 align-start pt-1 text-[13px]'>
              34,542 <span className='hidden sm:hidden md:inline'> views</span>
            </p>
          </div>
          <div className='flex gap-2'>
            <Image
              src={usersIcon}
              alt='more'
              width={15}
              height={6}
              className='lg:h-6 lg:w-6'
            />
            <p className='text-#262626  font-400 leading-18 align-end pt-1 text-[13px]'>
              6 <span className='hidden sm:hidden md:inline'>licensees</span>
            </p>
          </div>
        </div>

        <div className='flex justify-between gap-1'>
          <Image
            src={messageIcon}
            alt='message'
            width={20}
            height={10}
            className='lg:h-6 lg:w-6 '
          />
          <Image
            src={booknnarkIcon}
            alt='save'
            width={20}
            height={10}
            className='lg:h-6 lg:w-6'
          />
          <Image
            src={evidencForm}
            alt='add'
            width={20}
            height={10}
            className='lg:h-6 lg:w-6'
          />
        </div>
      </div>

      <div className='align-center sm:flex-wrap-nowrap flex w-[100%] flex-wrap items-center justify-between gap-3 py-2'>
        <p className=' font-weight-normal m:w-60 w-80 text-sm leading-5 text-gray-700'>
          {work.description}
        </p>
        <Link
          href='#'
          className=' items-centertext-white justify-center rounded-md border border-solid border-primary bg-[#5F437F] px-3 py-1 text-sm font-light font-normal leading-6 tracking-tight text-white'
        >
          {feed.code}
        </Link>
      </div>

      <div className=' flex w-[100%] '>
        <Link
          href='#'
          className='line-height-6 hover:   flex w-[100%] pt-4 text-sm font-medium leading-6 text-primary decoration-slate-400 hover:text-black sm:w-[50%] sm:text-right md:text-left '
        >
          View more details
        </Link>
      </div>
    </div>
  );
};

export default FeedItem;
