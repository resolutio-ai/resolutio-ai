'use client';

import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { FC, useMemo } from 'react';
import CreatorInformation from '../CreatorInformation/CreatorInformation';
//import License from '../License/License';
import Review from '../Review/Review';
import WorkDetails from '../WorkDetails/WorkDetails';
import './EvidenceForm.scss';

// Define steps with corresponding components
const EvidenceSteps = [
  {
    id: 1,
    label: 'Creators Information',
    view: <CreatorInformation />,
  },
  {
    id: 2,
    label: 'Work Details',
    view: <WorkDetails />,
  },
  {
    id: 3,
    label: 'Review',
    view: <Review />,
  },
  /* {
    id: 4,
    label: 'License',
    view: <License />,
  }, */
];

const EvidenceForm: FC = () => {
  const { currentStep } = useEvidenceForm();

  // Get the current form section based on the current step
  const formSection = useMemo(() => {
    const step = EvidenceSteps.find((step) => step.id === currentStep);
    return step ? step.view : null;
  }, [currentStep]);

  return (
    <div className='p-5 lg:p-10'>
      <h3 className='pb-4 text-4xl font-bold tracking-tight text-gray-500'>
        Creator Protection Form
      </h3>
      <div className='my-4 flex justify-center'>
        <ul className='steps'>
          {EvidenceSteps.map(({ id, label }) => (
            <li
              key={id}
              className={`step ${id <= currentStep ? 'step-primary' : ''}`}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className='mx-auto max-w-xl'>{formSection}</div>
    </div>
  );
};
export default EvidenceForm;
