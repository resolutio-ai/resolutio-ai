import React, { FC } from 'react';

interface WorkNameProps {
  workInput:string;
  onWorkNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorkNameInput: FC<WorkNameProps> = ({ onWorkNameChange,workInput }) => {
  return (
    <div>
    <label
      htmlFor=''
      className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
    >
      {' '}
      Name of Work
    </label>
    <input
      className='focus:shadow-outline flex w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3  leading-tight text-gray-700 shadow focus:outline-none '
      id='name1'
      type='text'
      value={workInput}
      required
      onChange={(event) => onWorkNameChange(event)}
      placeholder='Enter name of Work'
    />
  </div>
  );
};

export default WorkNameInput;
