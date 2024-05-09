import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { MEDIUM_OPTIONS } from '@/app/settings';

const WorkDetails = () => {
  const { previousStep } = useEvidenceForm();
  return (
    <div>
      <form>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text text-sm font-bold  text-gray-600'>
              Name of Work
            </span>
          </div>
          <input
            type='text'
            className='input input-bordered input-primary w-full'
            placeholder='Enter name of Work'
          />
        </label>
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
        <div className='mt-8 flex justify-end'>
          <button
            className='btn-secondary btn mr-8'
            type='button'
            onClick={previousStep}
          >
            Previous
          </button>
          <button className='btn-primary btn' type='submit'>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkDetails;
