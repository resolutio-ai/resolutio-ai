'use client';

import { useUserContext } from '@/app/contexts';
import Image from 'next/image';
import Link from 'next/link';
import LoginDialog from '../Dialogs/LoginDialog/LoginDialog';
import { ProfileDropdown } from './profile-dropdown/ProfileDropdown';

export const Header = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      <header className='header-container'>
        <div className='header navbar bg-base-100 fixed top-0 z-50 shadow-sm md:px-10'>
          <div className='navbar-start'>
            <Link className='desktop-logo hidden lg:inline-flex' href='/'>
              <Image
                src='/master_logo.svg'
                alt='Resolutio'
                width={50}
                height={50}
              />
            </Link>
            <Link className='mobile-logo inline-flex lg:hidden' href='/'>
              <Image
                src='/logo_linear_rectangle.svg'
                alt='Resolutio'
                width={150}
                height={50}
              />
            </Link>
          </div>
          <div className='navbar-end'>
            <ul className='menu menu-horizontal text-primary mx-2 hidden px-1 lg:flex'>
              {isAuthenticated && (
                <li>
                  <Link href='/feed' className='link-hover link'>
                    Feed
                  </Link>
                </li>
              )}
            </ul>
            <ProfileDropdown />
          </div>
        </div>
        <div className='vertical-spacing min-h-[4.25rem]'></div>
      </header>
      <LoginDialog />
    </>
  );
};
