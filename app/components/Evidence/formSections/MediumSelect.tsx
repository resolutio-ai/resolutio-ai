import { MEDIUM_OPTIONS } from '@/app/settings';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type MediumProps = {};

const MediumSelect: FC<MediumProps> = () => {
  const { register } = useFormContext();
  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text text-sm font-bold text-gray-600'>
          Medium
        </span>
      </div>
      <select
        className='select select-primary w-full max-w-xs'
        {...register('medium')}
      >
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
