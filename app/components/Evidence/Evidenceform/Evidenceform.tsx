'use client';
import { evidenceSchema } from '@/app/schemas';
import { EvidenceFromDto } from '@/app/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  CreationDate,
  CreatorsList,
  FileUpload,
  LicenseSelect,
  LicenseUpload,
  MediumSelect,
  WorkNameInput,
} from '../formSections';

import './Evidenceform.scss';

const defaultValues: EvidenceFromDto = {
  creators: [{ id: uuidv4(), name: '' }],
  nameOfWork: '',
  work: null,
  medium: 'Select a medium',
  alternativeMedium: '',
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
    formState: { isValid },
    reset,
    handleSubmit,
    watch,
  } = useFormMethods;

  const selectedLicense = watch('license');
  //const Medium = watch('medium');
  //const selectedCreators = watch('creators');
  const workName = watch('nameOfWork');

  const [file, setFile] = useState<File | null>(null);
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<string>('');
  const [alternativeMedium, setAlternativeMedium] = useState<string>('');
  const [formSubmissionMessage, setFormSubmissionMessage] =
    useState<string>('');

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleMediumSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMedium(e.target.value);
  };
  const handleAlternativeMedium = (e: ChangeEvent<HTMLInputElement>) => {
    setAlternativeMedium(e.target.value);
  };

  const handleLicenseUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedLicenceFile = e.target.files?.[0];

    if (uploadedLicenceFile) {
      setLicenceFile(uploadedLicenceFile);
    }
  };

  const onSubmit: SubmitHandler<EvidenceFromDto> = async (data) => {
    /*  try {
      const metadata = {
        licenseType: selectedLicense,
        alternativeMedium: alternativeMedium,
        medium: Medium,
        dateOfCreation: selectedDate?.toISOString(),
        nameOfWork: workName,
        creatorId: selectedCreators,
      };

      const formData = new FormData();
      formData.append('metadata', JSON.stringify(metadata));
      if (file) {
        formData.append('userwork', file);
      }
      if (licenceFile) {
        formData.append('userpersonalizedlicense', licenceFile);
      }

      const response = await submitEvidence(formData);

      console.log('API Response:', response);
      setFormSubmissionMessage('Form submission was successful ');
    } catch (error) {
      console.error('Error:', error);
      setFormSubmissionMessage(
        'Form submission unsuccessful. Please try again.'
      );
    } */
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
          <WorkNameInput workInput={workName} />
          <MediumSelect
            selectedMedium={selectedMedium}
            handleMediumSelected={handleMediumSelected}
            handleAlternativeMedium={handleAlternativeMedium}
            alternativeMedium={alternativeMedium}
          />
          <FileUpload handleFileUpload={handleFileUpload} />
          <CreationDate
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <LicenseSelect />
          {selectedLicense === 'Your own license' && (
            <LicenseUpload handleLicenseUpload={handleLicenseUpload} />
          )}
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

function append(arg0: { id: string; name: string }) {
  throw new Error('Function not implemented.');
}
