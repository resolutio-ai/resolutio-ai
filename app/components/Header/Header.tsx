'use client';

import { useUserContext } from '@/app/contexts';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import LoginDialog from '../Dialogs/LoginDialog/LoginDialog';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import './Header.scss';

const Header: FC = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      <header className='header-container'>
        <div className='header navbar fixed top-0 z-50 bg-base-100 shadow md:px-10'>
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
            <ul className='menu menu-horizontal mx-2 hidden px-1 text-primary lg:flex'>
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
        <div className='vertical-spacing'></div>
      </header>
      <LoginDialog />
    </>
  );
};

export default Header;
