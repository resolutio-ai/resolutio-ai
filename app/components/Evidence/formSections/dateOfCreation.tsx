import { calenderIcon } from '@/app/assets';
import Image from 'next/image';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  return (
    <div className='relative flex flex-col'>
      <label
        htmlFor=''
        className='font-noto-sans text-sm font-bold leading-tight text-gray-600 '
      >
        {' '}
        Date of Creation
      </label>

      <DatePicker
        placeholderText='Select date'
        dateFormat="yyyy/MM/dd"
        selected={selectedDate}
        className=' focus:shadow-outline flex w-[100%] appearance-none items-center justify-between rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 placeholder-gray-400 shadow focus:outline-none'
        onChange={(date) => onChange(date)}
      />
      <div className=' align-center absolute inset-y-0 right-0 flex items-center justify-center pr-4 pt-5 text-gray-700'>
        <Image
          src={calenderIcon}
          alt='calender'
          className='h-5 w-5 cursor-pointer'
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
