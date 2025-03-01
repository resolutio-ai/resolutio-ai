import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';

type FormNavigatorProps = {
  nextBtnText?: string;
};

const FormNavigator = ({ nextBtnText = 'Next' }: FormNavigatorProps) => {
  const { previousStep, currentStep } = useEvidenceForm();

  const showPrevious = currentStep > 1;

  return (
    <div className='mt-8 flex justify-end'>
      {showPrevious && (
        <button
          className='btn-secondary btn mr-8'
          type='button'
          onClick={previousStep}
        >
          Previous
        </button>
      )}
      <button className='btn-primary btn' type='submit'>
        {nextBtnText}
      </button>
    </div>
  );
};

export default FormNavigator;
