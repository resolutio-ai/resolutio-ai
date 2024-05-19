import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { FC } from 'react';

type FormNavigatorProps = {
  nextBtnText?: string;
};

const FormNavigator: FC<FormNavigatorProps> = ({ nextBtnText = 'Next' }) => {
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
