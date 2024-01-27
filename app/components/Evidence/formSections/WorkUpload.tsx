import { UploadIcon } from '@/app/assets';
import React from 'react';

type WorkUploadProps = {};

const WorkUpload: React.FC<WorkUploadProps> = () => {
  return (
    <label className='form-control w-full max-w-xs cursor-pointer'>
      <div className='label'>
        <span className='label-text text-sm font-bold text-gray-600'>File</span>
      </div>

      <div className='focus:shadow-outline relative rounded-md border border-[#5F437F] py-3 text-gray-700 shadow'>
        <div className='pl-4 text-gray-400'>
          Upload file
          <div className='absolute right-4 top-4'>
            <UploadIcon />
          </div>
          <input type='file' id='upload' accept='image/*' className='hidden' />
        </div>
      </div>
    </label>
  );
};

export default WorkUpload;
