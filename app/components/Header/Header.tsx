import Image from 'next/image';
import { FC } from 'react';

import './Header.scss';

const Header: FC = () => {
  return (
    <>
      <header className='header navbar fixed top-0 z-50  bg-base-100 md:px-10'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
            >
              <li>
                <a>Feed</a>
              </li>
              <li>
                <a>Resources</a>
              </li>
              <li>
                <a>ResEd</a>
              </li>
              <li>
                <a>Community</a>
              </li>
              <li>
                <a>Login</a>
              </li>
            </ul>
          </div>
          <a className='btn btn-ghost text-xl normal-case text-primary'>
            <Image
              src='/master_logo.svg'
              alt='Resolutio'
              className='hidden lg:flex'
              width={50}
              height={50}
            />
            <Image
              src='/logo_linear_rectangle.svg'
              alt='Resolutio'
              className='lg:hidden'
              width={150}
              height={50}
            />
          </a>
        </div>
        <div className='navbar-end'>
          <ul className='menu menu-horizontal hidden px-1 text-primary lg:flex'>
            <li>
              <a>Feed</a>
            </li>
            <li>
              <a>Resources</a>
            </li>
            <li>
              <a>ResEd</a>
            </li>
            <li>
              <a>Community</a>
            </li>
          </ul>
          <a className='btn btn-primary hidden lg:flex'>Login</a>
        </div>
      </header>
      <div className='vertical-spacing  min-h-16'></div>
    </>
  );
};

export default Header;
