import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { FC, useMemo } from 'react';
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
  const { fields, append, remove } = useFieldArray({
    name: 'creators',
  });

  const addCreator = () => {
    append(
      { id: uuidv4(), name: '' },
      {
        shouldFocus: true,
      }
    );
  };

  const removeCreator = () => {
    remove(fields.length - 1);
  };

  const totalCreators = useMemo(() => fields.length, [fields.length]);
  return (
    <div>
      {fields.map((field, index) => (
        <CreatorInput key={field.id} id={index} />
      ))}
      <div className='mt-2 flex justify-end'>
        {totalCreators > 1 && (
          <div className='tooltip' data-tip='delete'>
            <button className='mr-2' onClick={removeCreator}>
              <XCircleIcon height='24' className=' text-red-500' />
            </button>
          </div>
        )}
        <div className='tooltip' data-tip='Add'>
          <button onClick={addCreator}>
            <PlusCircleIcon height='24' className='text-primary' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorsList;
