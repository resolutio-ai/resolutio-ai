import { dropdownIcon } from '@/app/assets';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

interface MediumProps {
  selectedMedium: string;
  handleMediumSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
  alternativeMedium: string;
  handleAlternativeMedium: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Medium: React.FC<MediumProps> = ({
  selectedMedium,
  handleMediumSelected,
  handleAlternativeMedium,
}) => {
  const [otherMedium, setOtherMedium] = useState('');

  const isOtherSelected = selectedMedium === 'Other';

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleMediumSelected(e);
    if (e.target.value === 'Other') {
      setOtherMedium('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherMedium(e.target.value);
    handleAlternativeMedium(e);
  };

  return (
    <div className=''>
      <div className='relative'>
        <label
          htmlFor=''
          className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
        >
          Medium
        </label>
        <select
          className='form-select align-center focus:shadow-outline block w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none  '
          value={selectedMedium}
          onChange={handleSelectChange}
        >
          <option className='leading-tight text-gray-400' disabled>
            Select
          </option>
          <option>Film</option>
          <option>Photo</option>
          <option>Music</option>
          <option>AI</option>
          <option>Art</option>
          <option>Other</option>
        </select>
        <div className='align-center pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-4 pt-5 text-gray-700'>
          <Image src={dropdownIcon} alt='tooltip' className='h-5 w-5' />
        </div>
      </div>
      <div>
        {isOtherSelected && (
          <div className='mt-4'>
            <label
              htmlFor='otherMedium'
              className='block text-sm font-bold text-gray-600'
            >
              Specific Medium
            </label>
            <input
              type='text'
              id='otherMedium'
              name='otherMedium'
              value={otherMedium}
              onChange={handleInputChange}
              className='align-center focus:shadow-outline block w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Medium;
