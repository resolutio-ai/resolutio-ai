import { dropdownIcon, tooltip } from '@/app/assets';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';

interface LicenseSelectProps {
  selectedLicense: string;
  handleLicenseChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleLicenseUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LicenseSelect: React.FC<LicenseSelectProps> = ({
  selectedLicense,
  handleLicenseChange,
  handleLicenseUpload,
}) => {
  return (
    <div className='relative'>
      <label
        htmlFor=''
        className='font-noto-sans flex text-sm font-bold leading-tight text-gray-600 '
      >
        License
        <div className=' tooltip relative ml-1 inline-block'>
          <Image src={tooltip} alt='tooltip' className='h-4 w-4' />
          <span className='tooltiptext font-weight-400 leading-18 invisible absolute bottom-full left-1/2 z-10 w-[120px] -translate-x-1/2 transform rounded border bg-white p-[7px] text-center text-xs font-normal text-black'>
            Learn more about Licenses{' '}
            <a href='#' className='text-xs font-bold text-black underline'>
              here
            </a>
          </span>
        </div>
      </label>

      <select
        value={selectedLicense}
        onChange={handleLicenseChange}
        className='form-select  align-center focus:shadow-outline	 block w-[100%] appearance-none  flex-col  items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none  '
      >
        <option className=' leading-tight text-gray-400' disabled >
          Select{' '}
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          CC BY
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          CC BY-SA
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          CC BY-NC
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          CC BY-NC-SA
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          CC BY-NC-ND
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>CCO</option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          resolution License
        </option>
        <option className='mb-3	 appearance-none hover:bg-primary '>
          Your own license
        </option>
      </select>

      <div className=' align-center pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-4 pt-5 text-gray-700'>
        <Image src={dropdownIcon} alt='tooltip' className='h-5 w-5' />
      </div>
    </div>
  );
};

export default LicenseSelect;
