import { calenderIcon } from '@/app/assets';
import Image from 'next/image';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type CreationProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const CreationDate: FC<CreationProps> = ({ selectedDate, onChange }) => {
  return (
    <div className='relative flex flex-col'>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text text-sm font-bold text-gray-600'>
            Date of Creation
          </span>
        </div>
        <DatePicker
          placeholderText='Select date'
          selected={selectedDate}
          className=' focus:shadow-outline flex w-[100%] appearance-none items-center justify-between rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 placeholder-gray-400 shadow focus:outline-none'
          onChange={(date) => onChange(date)}
        />
        <div className='absolute bottom-4 right-6'>
          <Image
            src={calenderIcon}
            alt='calender'
            className='h-5 w-5 cursor-pointer'
          />
        </div>
      </label>
    </div>
  );
};

export default CreationDate;
