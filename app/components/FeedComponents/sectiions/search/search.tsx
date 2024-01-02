import { searchIcon } from '@/app/assets/icons';
import Image from 'next/image';
import './search.scss';

import React from 'react';

interface InputProps {
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<InputProps> = () => {
  return (
    <div className='relative mb-5 flex flex  items-center rounded-md border border-primary bg-gray-200 px-10 py-2 sm:w-[100%] '>
      <Image
        src={searchIcon}
        alt='search'
        width={20}
        height={20}
        className='absolute left-3  top-1/2 z-20 -translate-y-1/2 transform'
      />

      <input
        type='text'
        placeholder='Search from the world of creativity'
        className='bg-danger relative  w-full  border-none bg-transparent font-normal text-gray-700 outline-none md:py-1'
      />
    </div>
  );
};

export default Search;
