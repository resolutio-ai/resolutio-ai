import React from 'react';
import { useFormContext } from 'react-hook-form';

const WorkUpload: React.FC = () => {
  const { register } = useFormContext();
  return (
    <label className='form-control mt-4 w-full cursor-pointer'>
      <div className='label'>
        <span className='label-text text-sm font-bold text-gray-600'>File</span>
      </div>
      <input
        type='file'
        className='file-input file-input-bordered file-input-primary w-full '
        {...register('file')}
      />
    </label>
  );
};

export default WorkUpload;
