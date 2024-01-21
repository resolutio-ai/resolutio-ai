import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type WorkNameInputProps = {};

const WorkNameInput: FC<WorkNameInputProps> = () => {
  const { register } = useFormContext();
  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text text-sm font-bold  text-gray-600'>
          Name of Work
        </span>
      </div>
      <input
        type='text'
        className='input input-bordered input-primary w-full max-w-xs'
        {...register('nameOfWork')}
        placeholder='Enter name of Work'
      />
    </label>
  );
};

export default WorkNameInput;
