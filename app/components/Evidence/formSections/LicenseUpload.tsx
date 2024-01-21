import { UploadIcon } from '@/app/assets';
import Image from 'next/image';
import React from 'react';

type LicenseUploadProps = {
  selectedLicense: string;
};

const LicenseUpload: React.FC<LicenseUploadProps> = ({ selectedLicense }) => {
  return (
    <div>
      {selectedLicense === 'Your own license' && (
        <div className='relative'>
          <label className='form-control w-full max-w-xs cursor-pointer'>
            <div className='label'>
              <span className='label-text text-sm font-bold text-gray-600'>
                File
              </span>
            </div>

            <div className='focus:shadow-outline relative rounded-md border border-[#5F437F] py-3 text-gray-700 shadow'>
              <div className='pl-4 text-gray-400'>
                Upload file
                <div className='absolute right-4 top-4'>
                  <UploadIcon />
                </div>
                <input
                  type='file'
                  id='upload'
                  accept='image/*'
                  className='hidden'
                />
              </div>
            </div>
          </label>
          <span className='align-center mt-2 flex'>
            <Image src={''} alt='tooltip' className='h-3 w-3  ' />

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

export default LicenseUpload;
