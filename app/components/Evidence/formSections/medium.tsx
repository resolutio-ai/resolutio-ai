import { dropdownIcon } from '@/app/assets';
import { EvidenceFromDto } from '@/app/types';
import Image from 'next/image';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

type MediumProps = {
  register: UseFormRegister<EvidenceFromDto>;
};

const Medium: FC<MediumProps> = ({ register }) => {
  return (
    <div className='relative'>
      <label
        htmlFor=''
        className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
      >
        Medium
      </label>
      <select
        className=' align-center focus:shadow-outline block w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none  '
        {...register('medium')}
      >
        <option className=' leading-tight text-gray-400' disabled selected>
          Select{' '}
        </option>
        <option>Film</option>
        <option>Photo</option>
        <option>Music</option>
        <option>AI</option>
        <option>Art</option>
        <option>Other</option>
      </select>
      <div className=' align-center pointer-events-none absolute inset-y-0 right-0 flex  items-center justify-center pr-4 pt-5 text-gray-700'>
        <Image src={dropdownIcon} alt='tooltip' className='h-5 w-5' />
      </div>
    </div>
  );
};

export default Medium;
