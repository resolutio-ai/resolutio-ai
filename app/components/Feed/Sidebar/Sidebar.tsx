'use client';

import { dropdownIcon, HomeBtnSvg } from '@/app/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Sidebar.module.css';

type Routes = {
  label: string;
  icon: React.ReactElement;
  href: string;
};

const routes: Routes[] = [
  {
    label: 'Home',
    icon: <HomeBtnSvg />,
    href: '/feed'
  }
  /* {
    label: 'Message',
    icon: <MessageIcon />,
    href: '/feed/message',
  },
  {
    label: 'Notification',
    icon: <NotificationIcon />,
    href: '/Notification',
  },
  {
    label: 'Evidence form',
    icon: <EvidenceSvg />,
    href: '/EvidenceForm',
  },
  {
    label: 'Saved',
    icon: <Bookmarkicon />,
    href: '/Saves',
  },
  {
    label: 'Support',
    icon: <SupportIcon />,
    href: '/Support',
  },
  {
    label: 'Profile',
    icon: <SingleUser />,
    href: '/Profile',
  }, */
];
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState<number>(0);

  const handleActiveLink = (index: number) => {
    setActiveLink(index);
  };

  return (
    <div className='flex flex-col space-y-4 text-black'>
      <div className='flex-1'>
        <div className='item-center mb-5 flex w-full'>
          <div className='relative lg:w-full'>
            <div className='dropdown dropdown-bottom w-full hover:text-white'>
              <div
                tabIndex={0}
                role='button'
                className='flex w-full items-center justify-between rounded-md border-none bg-primary px-5 py-4 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary lg:gap-5'
              >
                <p className='hidden md:inline'>Categories</p>
                <Image
                  src={dropdownIcon}
                  className='ms-3 h-2.5 w-2.5'
                  alt='dropdown'
                />
              </div>
              <ul
                tabIndex={0}
                className='menu dropdown-content z-[1] w-44 divide-y divide-gray-100 rounded-md bg-white text-primary shadow'
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

        <div className='space-y-2'>
          {routes.map((route, index) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => handleActiveLink(index)}
              className={`flex w-full cursor-pointer justify-start rounded-lg bg-white/10 p-3 text-sm font-medium text-black transition md:p-4 ${
                activeLink === index ? styles.activeGroup : styles.group
              }`}
            >
              <div className='flex flex-1 items-center'>
                <span
                  className={`mr-3 h-5 w-5 transition duration-300 ease-in-out md:h-6 md:w-6 ${styles.icon}`}
                >
                  {route.icon}
                </span>
                <span className='hidden md:inline'>{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
