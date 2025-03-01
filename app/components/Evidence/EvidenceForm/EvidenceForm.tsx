'use client';

import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { useMemo } from 'react';
import CreatorInformation from '../CreatorInformation/CreatorInformation';
//import License from '../License/License';
import Review from '../Review/Review';
import WorkDetails from '../WorkDetails/WorkDetails';

// Define steps with corresponding components
const EvidenceSteps = [
  {
    id: 1,
    label: 'Creators Information',
    view: <CreatorInformation />
  },
  {
    id: 2,
    label: 'Work Details',
    view: <WorkDetails />
  },
  {
    id: 3,
    label: 'Review',
    view: <Review />
  }
  /* {
    id: 4,
    label: 'License',
    view: <License />,
  }, */
];

const EvidenceForm = () => {
  const { currentStep } = useEvidenceForm();

  // Get the current form section based on the current step
  const formSection = useMemo(() => {
    const step = EvidenceSteps.find((step) => step.id === currentStep);
    return step ? step.view : null;
  }, [currentStep]);

  return (
    <div className='card xs:w-100 bg-white p-10 shadow-sm md:w-2xl'>
      <h3 className='pb-4 text-center text-4xl font-bold tracking-tight text-gray-500'>
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
      <div>{formSection}</div>
    </div>
  );
};
export default EvidenceForm;
