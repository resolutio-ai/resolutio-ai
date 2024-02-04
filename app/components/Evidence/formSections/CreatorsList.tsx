import { EvidenceFromDto } from '@/app/types';
import { ChangeEvent, FC } from 'react';
import {
  UseFormRegister,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type CreatorsListProps = {
  onAddCreator: () => void;
};

const CreatorsList: FC<CreatorsListProps> = () => {
  const { register } = useFormContext();
  const { fields, append } = useFieldArray({
    name: 'creators',
  });
  const onAddCreator = () => {
    append({ id: uuidv4(), name: '' });
  };
  return (
    <div>
      {fields.map((field, index) => (
        <label className='form-control w-full max-w-xs' key={field.id}>
          <div className='label'>
            <span className='label-text text-sm font-bold  text-gray-600'>
              Name of Creator
            </span>
          </div>
          <input
            type='text'
            className='input input-bordered input-primary w-full max-w-xs'
            placeholder='Enter name'
            {...register(`creators.${index}.name`)}
          />
        </label>
      ))}
      <div onClick={onAddCreator} className='flex cursor-pointer text-right '>
        <p className='font-weight: 400 w-[100%] px-2  text-base  leading-tight'>
          <span className='align-center px-2 text-lg text-primary  '>
            &#43;
          </span>
          Add Co-creators
        </p>
      </div>
    </div>
  );
};

export default CreatorsList;
