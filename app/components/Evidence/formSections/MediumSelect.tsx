import { MEDIUM_OPTIONS } from '@/app/settings';
import { ChangeEvent, FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type MediumProps = {
  selectedMedium: string;
  handleMediumSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
  alternativeMedium: string;
  handleAlternativeMedium: (event: ChangeEvent<HTMLInputElement>) => void;
};

const MediumSelect: FC<MediumProps> = ({
  selectedMedium,
  handleMediumSelected,
  handleAlternativeMedium,
}) => {
  const { register } = useFormContext();

  const [otherMedium, setOtherMedium] = useState('');

  const isOtherSelected = selectedMedium === 'Other';

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleMediumSelected(e);
    if (e.target.value === 'Other') {
      setOtherMedium('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherMedium(e.target.value);
    handleAlternativeMedium(e);
  };
  return (
    <div>
      <label className='form-control w-full max-w-xs'>
        <div className='label'>
          <span className='label-text text-sm font-bold text-gray-600'>
            Medium
          </span>
        </div>
        <select
          className='select select-primary w-full max-w-xs'
          {...register('medium')}
          onChange={handleSelectChange}
        >
          <option disabled defaultValue={'Select a medium'}>
            Select a medium
          </option>
          {MEDIUM_OPTIONS.map((medium) => (
            <option key={medium}>{medium}</option>
          ))}
        </select>
      </label>
      <div>
        {isOtherSelected && (
          <div className='mt-4'>
            <label
              htmlFor='otherMedium'
              className='block text-sm font-bold text-gray-600'
            >
              Specific Medium
            </label>
            <input
              type='text'
              id='otherMedium'
              name='otherMedium'
              value={otherMedium}
              onChange={handleInputChange}
              className='align-center focus:shadow-outline block w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MediumSelect;
