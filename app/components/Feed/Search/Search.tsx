import { SearchIcon } from '@/app/assets';
import React, { FC } from 'react';

import './Search.scss';

interface SearchProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchProps> = () => {
  return (
    <div className='relative mb-5 flex items-center rounded-md border border-primary bg-gray-200 px-4 py-2 sm:w-[100%]'>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search from the world of creativity'
        className='bg-danger relative w-full border-none bg-transparent font-normal text-gray-700 outline-none md:py-1'
      />
    </div>
  );
};

export default Search;
