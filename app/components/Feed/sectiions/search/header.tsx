import { search } from '@/app/assets/icons';
import Image from 'next/image';
import './header.scss';

import React from "react";

interface InputProps {
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<InputProps> = () => {
  return (
    <div className="relative flex items-center rounded-md px-10 py-2 bg-gray-200 mb-5 flex border border-primary ">
      <Image src={search} alt="search" width={20} height={20} className='absolute z-20  top-1/2 left-3 transform -translate-y-1/2' />

      <input
        type="text"
        placeholder="Search from the world of creativity"
        className='bg-danger md:py-1  relative  w-full bg-transparent border-none outline-none font-normal text-gray-700'
        // onChange={onChange}
      />
    </div>
  );
};

export default Search;