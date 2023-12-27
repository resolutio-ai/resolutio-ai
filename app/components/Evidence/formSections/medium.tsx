import Image from 'next/image';
import React from 'react';
import dropdownicon from '../../../assets/dropdownicon.svg';


const Medium: React.FC = () => {
  return (
    <div className='relative'>
    <label
      htmlFor=''
      className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
    >
      Medium
    </label>
    <select className=' align-center focus:shadow-outline block flex flex w-[100%] appearance-none flex-col flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none  '>
      <option
        className=' leading-tight text-gray-400'
        disabled
        selected
      >
        Select{' '}
      </option>
      <option>Film</option>
      <option>Photo</option>
      <option>Music</option>
      <option>AI</option>
      <option>Art</option>
      <option>Other</option>
    </select>
    <div className=' align-center pointer-events-none absolute inset-y-0 right-0 flex flex items-center justify-center pr-4 pt-5 text-gray-700'>
      <Image src={dropdownicon} alt='tooltip' className='h-5 w-5' />
    </div>
  </div>  
  )
}

export default Medium