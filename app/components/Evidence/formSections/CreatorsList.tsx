import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type CreatorInputProps = {
  id: number;
};

const CreatorInput: FC<CreatorInputProps> = ({ id }) => {
  const { register } = useFormContext();
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text text-sm font-bold  text-gray-600'>
          Name of Creator
        </span>
      </div>
      <input
        type='text'
        className='input input-bordered input-primary w-full'
        placeholder='Enter name'
        {...register(`creators.${id}.name`)}
      />
    </label>
  );
};

type CreatorsListProps = {};

const CreatorsList: FC<CreatorsListProps> = () => {
  const { fields, append } = useFieldArray({
    name: 'creators',
  });

  const addCreators = () => {
    append({ id: uuidv4(), name: '' });
  };

  return (
    <div>
      {fields.map((field, index) => (
        <CreatorInput key={field.id} id={index} />
      ))}
      <button onClick={addCreators} className='text-primary'>
        <span className='px-2 text-lg '>&#43;</span>
        <span>Add Co-creators</span>
      </button>
      <div className='flex cursor-pointer text-right '>
        <p className='font-weight: 400 w-[100%] px-2  text-base  leading-tight'>
          <span className='align-center px-2 text-lg text-primary'>&#43;</span>
          Add Co-creators
        </p>
      </div>
    </div>
  );
};

export default CreatorsList;
