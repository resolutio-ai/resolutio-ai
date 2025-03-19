import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AlignCenter } from './components/align-center/AlignCenter';

const NotFound = () => {
  return (
    <AlignCenter>
      <Image src='404.svg' alt='404 Page not found' width={400} height={400} />
      <div className='text-center'>
        <h1 className='my-10 text-xl'>
          {"We're sorry :(, but the page your are looking for does not exit!"}
        </h1>
        <Link className='btn-primary btn' href='/'>
          Home
        </Link>
      </div>
    </AlignCenter>
  );
};

export default NotFound;
