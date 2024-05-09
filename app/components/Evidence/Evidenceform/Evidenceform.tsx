'use client';

import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { EvidenceFromDto } from '@/app/types';
import { FC, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CreatorInformation from '../CreatorInformation/CreatorInformation';
import License from '../License/License';
import Review from '../Review/Review';
import WorkDetails from '../WorkDetails/WorkDetails';
import './Evidenceform.scss';

const defaultValues: EvidenceFromDto = {
  creators: [{ id: uuidv4(), name: '' }],
  nameOfWork: '',
  work: null,
  medium: 'Select a medium',
  dateOfCreation: new Date(),
  license: 'Select a license',
};

const EvidenceSteps = [
  {
    id: 1,
    label: 'Creators Information',
  },
  {
    id: 2,
    label: 'Work Details',
  },
  {
    id: 3,
    label: 'License',
  },
  {
    id: 4,
    label: 'Review',
  },
];

const Evidenceform: FC = () => {
  const { currentStep } = useEvidenceForm();

  const formSection = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <CreatorInformation />;
      case 2:
        return <WorkDetails />;
      case 3:
        return <License />;
      case 4:
        return <Review />;
      default:
        return null;
    }
  }, [currentStep]);
  console.log('currentStep', currentStep);

  return (
    <div className='p-5 lg:p-10'>
      <h3 className='pb-4 text-4xl font-bold tracking-tight text-gray-500'>
        Evidence Form
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
export default Evidenceform;
