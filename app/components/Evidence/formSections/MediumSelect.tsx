import { MEDIUM_OPTIONS } from '@/app/settings';
import { FC } from 'react';

const MediumSelect: FC = () => {
  return (
    <label className='form-control mt-4 w-full'>
      <div className='label'>
        <span className='label-text text-sm font-bold text-gray-600'>
          Medium
        </span>
      </div>
      <select className='select select-primary w-full'>
        <option disabled defaultValue={'Select a medium'}>
          Select a medium
        </option>
        {MEDIUM_OPTIONS.map((medium) => (
          <option key={medium}>{medium}</option>
        ))}
      </select>
    </label>
  );
};

export default MediumSelect;
