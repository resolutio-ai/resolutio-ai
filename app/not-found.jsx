import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='res-container my-10'>
      <div className='flex justify-center'>
        <Image
          src='404.svg'
          alt='404 Page not found'
          width={500}
          height={500}
        />
      </div>
      <div className='text-center'>
        <h1 className='my-10 text-3xl font-bold'>
          {"We're sorry :(, but the page your are looking for does not exit!"}
        </h1>
        <Link className='btn-primary btn' href='/'>
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
