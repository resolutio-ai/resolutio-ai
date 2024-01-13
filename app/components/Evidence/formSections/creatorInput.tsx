import { Creator } from '@/app/types';
import { FC } from 'react';

type CreatorInputProps = {
  id: number;
  value: string;
  onChange: (id: number, value: string) => void;
};

const CreatorInput: FC<CreatorInputProps> = ({ id, value, onChange }) => {
  return (
    <div>
      <label className='font-noto-sans text-sm font-bold leading-tight text-gray-600'>
        Name of Creator
      </label>
      <input
        className='focus:shadow-outline mb-2 flex w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none'
        id={`name${id}`}
        type='text'
        placeholder='Enter name'
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
};

interface CreatorsListProps {
  creators: Creator[];
  onAddCreator: () => void;
  onNameChange: (id: number, value: string) => void;
}

const CreatorsList: FC<CreatorsListProps> = ({
  creators,
  onAddCreator,
  onNameChange,
}) => {
  return (
    <div>
      {creators.map((creator) => (
        <CreatorInput
          key={creator.id}
          id={creator.id}
          value={creator.name}
          onChange={onNameChange}
        />
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
