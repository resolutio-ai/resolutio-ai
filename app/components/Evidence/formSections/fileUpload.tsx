import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import fileUpload from '../../../assets/fileUpload.svg';

interface FileUploadProps {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload }) => {
  return (
    <div className='relative'>
      <label
        htmlFor='fileUpload'
        className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
      >
        File
      </label>
      <div className='focus:shadow-outline flex w-[100%] items-center rounded-md border border-solid border-[#5F437F] py-3 leading-tight text-gray-700 shadow focus:outline-none'>
        <label
          htmlFor='upload'
          className='w-full cursor-pointer pl-4 text-left leading-tight text-gray-400 '
        >
          Enter name of work
          <div className='align-center absolute inset-y-0 right-0 flex flex cursor-pointer items-center justify-between pr-4 pt-5 text-gray-700'>
            <Image src={fileUpload} alt='tooltip' className='h-5 w-5' />
          </div>
        </label>

        <input
          type='file'
          id='upload'
          accept='image/*'
          onChange={(e) => handleFileUpload(e)}
          className='hidden'
        />
      </div>
    </div>
  );
};

export default FileUpload;