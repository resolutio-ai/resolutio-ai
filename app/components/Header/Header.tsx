import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import './Header.scss';

const Header: FC = () => {
  return (
    <>
      <header className='header navbar fixed top-0 z-50 bg-base-100 shadow md:px-10'>
        <div className='navbar-start'>
          <div className='dropdown hidden'>
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
            </ul>
          </div>
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
          {/* <ul className='menu menu-horizontal hidden px-1 text-primary lg:flex'>
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
          </ul> */}
          <a
            className='btn-primary btn'
            href='https://docs.google.com/forms/d/e/1FAIpQLSdFA8JiIw1Dnfmv8uRlnLnw8wSCiH3ENT7qO6I_pIMoTLaafQ/viewform'
            target='_blank'
          >
            Join Waitlist
          </a>
        </div>
      </header>
      <div className='vertical-spacing  min-h-16'></div>
    </>
  );
};

export default Header;
