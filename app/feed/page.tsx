'use client';

import {
  MoreIcon,
  evidencForm,
  eyeIcon,
  messageIcon,
  booknnarkIcon,
  usersIcon,
} from '@/app/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../components/Feed/dummydata';
import Search from '../components/Feed/sectiions/search/header';
import { FC, useEffect, useState } from 'react';
interface Post {
  creator: string;
  creatorImage: string;
  art: string;
  artdescription: string;
  description: string;
  code: string;
  licence: string;
  href: string;
  id: string;
}
const API_URL =
  'https://gist.github.com/tamuno777/a838d3e0484b4477bf6e2031c43cbd3b/raw/3fec981e05b059fbe9d18190076f0a906ac360bd/feedPosts';

const Home: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const decodedPosts = data.map((item: any) => ({
          ...item,
          art: `data:image/${item.imageType};base64,${item.imageBase64}`,
        }));
        setPosts(decodedPosts);
      });
  }, []);

  return (
    <div className=' w-5/6  pr-2 md:pt-5   '>
      <Search placeholder={''} />
      <div
        className=' align-center md:align-center my-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:justify-center md:gap-10 
'
      >
        {Post.map((item) => (
          <div
            key={item.id}
            className='flex shrink-0 flex-col items-start justify-start border-b border-gray-400 pb-5 pe-1 '
          >
            <div className='align-center flex w-[100%] items-center  justify-between gap-4  py-2'>
              <div className='flex items-center justify-between gap-2   '>
                <Image
                  src={item.creatorImage}
                  alt={item.creator}
                  width={25}
                  height={25}
                  loader={({ src }) => src}
                  className=' rounded-[50%]'
                />
                <p className='color-gray-700 font-dm-sans text-center text-base font-bold font-normal leading-6'>
                  <strong>
                    {item.creator}{' '}
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
                src={item.art}
                alt={item.description}
                className='h-447 w-[100%] shrink-0 rounded-md '
              />
              <div className='absolute right-[20px] top-[10px] flex w-[35px] cursor-pointer justify-center rounded-md  bg-info bg-white/25 p-2  backdrop-blur-sm transition duration-500 ease-in-out'>
                <Image
                  src={item.artdescription}
                  alt={item.description}
                  width={25}
                  height={25}
                />
              </div>
            </div>

            <div className='align-center flex w-[100%] items-center  justify-between gap-4  py-2  '>
              <div className='flex w-80 gap-3'>
                <div className='align-end flex gap-2 '>
                  <Image
                    src={eyeIcon}
                    alt='more'
                    width={13}
                    height={10}
                    className='lg:h-6 lg:w-6'
                  />
                  <span className='text-#262626 font-400 leading-18 align-start pt-1 text-[13px]'>
                    34,542 views
                  </span>
                </div>
                <div className='flex gap-2'>
                  <Image
                    src={usersIcon}
                    alt='more'
                    width={13}
                    height={6}
                    className='lg:h-6 lg:w-6'
                  />
                  <span className='text-#262626  font-400 leading-18 align-end pt-1 text-[13px]'>
                    6 licensees
                  </span>
                </div>
              </div>
              <div className='flex gap-6 sm:gap-3 lg:gap-3'>
                <Image
                  src={messageIcon}
                  alt='message'
                  width={40}
                  height={10}
                  className='lg:h-6 lg:w-6'
                />
                <Image
                  src={booknnarkIcon}
                  alt='save'
                  width={40}
                  height={10}
                  className='lg:h-6 lg:w-6'
                />
                <Image
                  src={evidencForm}
                  alt='add'
                  width={40}
                  height={10}
                  className='lg:h-6 lg:w-6'
                />
              </div>
            </div>

            <div className='align-center sm:flex-wrap-nowrap flex w-[100%] flex-wrap items-center justify-between gap-3 py-2'>
              <p className=' font-weight-normal m:w-60 w-80 text-sm leading-5 text-gray-700'>
                {item.description}
              </p>
              <Link
                href='#'
                className=' items-centertext-white justify-center rounded-md border border-solid border-primary bg-[#5F437F] px-3 py-1 text-sm font-light font-normal leading-6 tracking-tight text-white'
              >
                {item.code}
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
        ))}
      </div>
    </div>
  );
};
export default Home;
