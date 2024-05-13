import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';

const Review = () => {
  const { previousStep, formData } = useEvidenceForm();

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <div>
      <div className='mt-8 flex justify-end'>
        <button
          className='btn-secondary btn mr-8'
          type='button'
          onClick={previousStep}
        >
          Previous
        </button>
        <button className='btn-primary btn' onSubmit={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
