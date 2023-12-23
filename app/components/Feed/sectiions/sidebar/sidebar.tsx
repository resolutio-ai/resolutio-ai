'use client';

import {
  booknnarkIcon,
  dropdownIcon,
  evidencForm,
  homeBtnSvg,
  messageIcon,
  notificationIcon,
  profileIcon,
  supportIcon,
} from '@/app/assets/icons';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Routes {
  label: string;
  icon: StaticImageData;
  href: string;
}

const routes: Routes[] = [
  {
    label: 'Home',
    icon: homeBtnSvg,
    href: '/feed',
  },
  {
    label: 'Message',
    icon: messageIcon,
    href: '/feed/message',
  },
  {
    label: 'Notification',
    icon: notificationIcon,
    href: '/Notification',
  },
  {
    label: 'Evidence form',
    icon: evidencForm,
    href: '/EvidenceForm',
  },
  {
    label: 'Saved',
    icon: booknnarkIcon,
    href: '/Saves',
  },
  {
    label: 'Support',
    icon: supportIcon,
    href: '/Support',
  },
  {
    label: 'Profile',
    icon: profileIcon,
    href: '/Profile',
  },
];

const Sidebar: FC = () => {
  return (
    <div className='flex flex-col space-y-4 text-black   md:pt-5 '>
      <div className='flex-1  px-3'>
        <div className='item-center mb-5  flex'>
          <div className='relative '>
            <div className='dropdown dropdown-bottom  hover:text-white   '>
              <div
                tabIndex={0}
                role='button'
                className=' inline-flex  w-[100%]  items-center gap-10 rounded-md border-none bg-primary px-5 py-4 text-center text-sm font-medium text-white text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary lg:gap-5  '
              >
                <p className='hidden sm:hidden md:inline'>Categories</p>

                <Image
                  src={dropdownIcon}
                  className='ms-3 h-2.5 w-2.5'
                  alt='dropdown'
                />
              </div>
              <ul
                tabIndex={0}
                className='menu  dropdown-content z-[1] w-44 divide-y divide-gray-100 rounded-md bg-white text-primary shadow'
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='space-y-2 '>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className='group flex w-full cursor-pointer justify-start rounded-lg bg-white/10 p-3 text-sm font-medium  text-black transition hover:bg-primary hover:text-white md:p-4'
            >
              <div className='flex flex-1 items-center'>
                <Image
                  src={route.icon}
                  className='mr-3 h-5 w-5 fill-transparent stroke-purple-700 transition duration-300 ease-in-out hover:fill-purple-700 md:h-6 md:w-6'
                  alt={route.label}
                />
                <span className='hidden sm:hidden md:inline'>
                  {route.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
