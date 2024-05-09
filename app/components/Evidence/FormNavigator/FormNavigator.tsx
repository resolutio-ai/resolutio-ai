'use client';

import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { FC } from 'react';

type FormNavigatorProps = {
  next: () => void;
  previous: () => void;
  nextBtnText: string;
  previousBtnText: string;
};

const FormNavigator: FC<FormNavigatorProps> = ({
  nextCallback,
  previous,
  nextBtnText = 'Next',
  previousBtnText = 'Previous',
}) => {
  const { currentStep } = useEvidenceForm();
  return (
    <div className='mt-8 flex justify-end'>
      {currentStep !== 1 && (
        <button className='btn-secondary btn mr-4' onClick={previous}>
          {previousBtnText}
        </button>
      )}
      {currentStep !== 4 && (
        <button className='btn-primary btn' onClick={next}>
          {nextBtnText}
        </button>
      )}
    </div>
  );
};

export default FormNavigator;
