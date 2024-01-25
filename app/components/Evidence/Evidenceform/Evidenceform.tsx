'use client';

import { evidenceSchema } from '@/app/schemas';
import { EvidenceFromDto } from '@/app/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CreationDate from '../formSections/CreationDate';
import CreatorsList from '../formSections/CreatorsList';
import LicenseSelect from '../formSections/LicenseSelect';
import LicenseUpload from '../formSections/LicenseUpload';
import MediumSelect from '../formSections/MediumSelect';
import WorkNameInput from '../formSections/WorkNameInput';
import WorkUpload from '../formSections/WorkUpload';

import './Evidenceform.scss';

const defaultValues: EvidenceFromDto = {
  creators: [{ id: uuidv4(), name: '' }],
  nameOfWork: '',
  work: null,
  medium: 'Select a medium',
  dateOfCreation: new Date(),
  license: 'Select a license',
};

const Evidenceform: FC = () => {
  const useFormMethods = useForm<EvidenceFromDto>({
    resolver: zodResolver(evidenceSchema),
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const {
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useFormMethods;

  console.log(errors, isValid);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<string>('');

  const onSubmit: SubmitHandler<EvidenceFromDto> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className='p-5 lg:p-10'>
      <h3 className='pb-4 text-4xl font-bold tracking-tight text-gray-500'>
        Evidence Form
      </h3>
      <FormProvider {...useFormMethods}>
        <form
          className='w-[100%] space-y-6 md:w-[328px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <CreatorsList />
          <WorkNameInput />
          <MediumSelect />
          <WorkUpload />
          <CreationDate
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <LicenseSelect />
          <LicenseUpload selectedLicense={selectedLicense} />
          <button
            className='btn-primary btn w-full'
            type='submit'
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default Evidenceform;
