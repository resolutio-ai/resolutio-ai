import {
  EvidenceFromData,
  useEvidenceForm
} from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import Image from 'next/image';
import { FC } from 'react';
import { EVIDENCE_MODAL_ID } from '../../Dialogs/EvidenceDialog/EvidenceDialog';

type DisplayCreatorsProps = {
  creators: EvidenceFromData['creators'];
};

const DisplayCreators: FC<DisplayCreatorsProps> = ({ creators }) => {
  return (
    <div>
      <h2 className='text-lg font-bold'>Creators Information:</h2>
      <ul className='list-disc pl-8'>
        {creators.map((creator) => (
          <li key={creator.id} className=''>
            {creator.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

type DisplayWorkProps = {
  work: EvidenceFromData['file'];
  nameOfWork: EvidenceFromData['nameOfWork'];
  dateOfCreation: EvidenceFromData['dateOfCreation'];
  medium: EvidenceFromData['medium'];
};

const DisplayWork: FC<DisplayWorkProps> = ({
  work,
  nameOfWork,
  dateOfCreation,
  medium
}) => {
  return (
    <div className='mt-4'>
      <h2 className='text-lg font-bold'>Work Details:</h2>
      <div className='pl-8'>
        <p className='mt-4'>
          <span className='pr-2 font-bold'>Name:</span>
          <span>{nameOfWork}</span>
        </p>
        <p className='my-4'>
          <span className='pr-2 font-bold'>Date Of Creation:</span>
          <span>{dateOfCreation.toLocaleDateString()}</span>
        </p>
        <p className='my-4'>
          <span className='pr-2 font-bold'>Medium:</span>
          <span>{medium}</span>
        </p>
        <Image
          src={URL.createObjectURL(work[0])}
          height='100'
          width='100'
          alt={work[0].name}
        />
      </div>
    </div>
  );
};

const Review = () => {
  const { previousStep, formData } = useEvidenceForm();

  const { creators, file, nameOfWork, dateOfCreation, medium } = formData;

  const openModal = () => {
    const modal = document.getElementById(
      EVIDENCE_MODAL_ID
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const onSubmit = () => {
    openModal();
  };

  return (
    <div className='mt-8 animate-fadeIn'>
      <DisplayCreators creators={creators} />
      <DisplayWork
        work={file}
        nameOfWork={nameOfWork}
        dateOfCreation={dateOfCreation}
        medium={medium}
      />
      <div className='mt-8 flex justify-end'>
        <button
          className='btn-secondary btn mr-8'
          type='button'
          onClick={previousStep}
        >
          Previous
        </button>
        <button className='btn-primary btn' onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
