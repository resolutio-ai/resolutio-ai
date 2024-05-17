import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';

const Review = () => {
  const { previousStep, formData } = useEvidenceForm();

  const onSubmit = () => {
    // TODO: Submit the form data to the server
  };

  return (
    <div>
      <div className='mockup-code bg-primary text-primary-content'>
        <pre>
          <code>{JSON.stringify(formData, null, ' ')}</code>
        </pre>
      </div>
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
