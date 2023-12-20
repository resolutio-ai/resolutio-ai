import React, { ChangeEvent } from 'react';
import tooltip from '../../../assets/tooltip.svg';
import fileUpload from '../../../assets/fileUpload.svg';
import Image from 'next/image';

interface FileUploadForLicenseProps {
    handleLicenseUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedLicense: string;

}

const FileUploadForLicense: React.FC<FileUploadForLicenseProps> = ({ handleLicenseUpload,selectedLicense }) => {
  return (
    <div>
    {selectedLicense === 'Your own license' && (
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
              Upload file
              <div className='align-center absolute inset-y-0 right-0 flex flex cursor-pointer items-center justify-between pr-4 pt-0 text-gray-700'>
                <Image src={fileUpload} alt='tooltip' className='h-5 w-5'  />
              </div>
            </label>

            <input
              type='file'
              id='upload'
              accept='image/*'
              onChange={(e) => handleLicenseUpload(e)}
              className='hidden'
            />
          </div>
          <span className='align-center mt-2 flex'>
            <Image src={tooltip} alt='tooltip' className='h-3 w-3  ' />

            <small className='pl-1 text-[10px]'>
              Create your own license using the Resolutio template{' '}
              <a href='#' className='text-primary'>
                <strong>
                  <u>here</u>
                </strong>
              </a>
              .
            </small>
          </span>
        </div>
      )}
      </div>
  );
};

export default FileUploadForLicense;
