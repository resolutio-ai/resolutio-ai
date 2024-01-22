'use client';

import { evidenceSchema } from '@/app/schemas';
import { Creator, EvidenceFromDto } from '@/app/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CreatorsList from '../formSections/creatorInput';
import CustomDatePicker from '../formSections/dateOfCreation';
import FileUpload from '../formSections/fileUpload';
import FileUploadForLicense from '../formSections/fileUploadforLicence';
import LicenseSelect from '../formSections/licenseSelect';
import Medium from '../formSections/medium';
import WorkNameInput from '../formSections/workNameInpute';
import './Evidenceform.scss';
import { submitEvidence } from '@/app/adapter/browser/formApiService';

const defaultValues: EvidenceFromDto = {
  creators: [{ id: 1, name: '' }],
  nameOfWork: '',
  work: null,
  medium: '',
  dateOfCreation: new Date(),
  license: '',
};

const Evidenceform: FC = () => {
  const { register, handleSubmit, reset } = useForm<EvidenceFromDto>({
    resolver: zodResolver(evidenceSchema),
    defaultValues: defaultValues,
  });

  const [file, setFile] = useState<File | null>(null);
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const [workName, setWorkName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [creators, setCreators] = useState<Creator[]>([{ id: 1, name: '' }]);
  const [selectedLicense, setSelectedLicense] = useState<string>('');
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
  const handleWorkName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkName(event.target.value);
  };
  const addCreator = () => {
    const newId = creators.length + 1;
    setCreators([...creators, { id: newId, name: '' }]);
  };
  const handleCreatorName = (id: number, value: string) => {
    setCreators((prevCreators) =>
      prevCreators.map((creator) =>
        creator.id === id ? { ...creator, name: value } : creator
      )
    );
  };

  const handleLicenseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLicense(event.target.value);
  };

  const handleLicenseUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedLicenceFile = e.target.files?.[0];

    if (uploadedLicenceFile) {
      setLicenceFile(uploadedLicenceFile);
    }
  };

  const handleFormSubmit: SubmitHandler<EvidenceFromDto> = async () => {
    try {
      const formData = new FormData();
      const metadata = {
        licenseType: selectedLicense,
        alternativeMedium: alternativeMedium,
        medium: selectedMedium,
        dateOfCreation: selectedDate?.toISOString(),
        nameOfWork: workName,
        creatorId: creators,
      };

      formData.append('metadata', JSON.stringify(metadata));
      if (file) {
        formData.append('userworks', file);
      }

      if (licenceFile) {
        formData.append('userpersonalizedlicense', licenceFile);
      }
      const response = await submitEvidence(formData);
      console.log('API Response:', response);
      setFormSubmissionMessage('Form submission was sucessfull ');
    } catch (error) {
      console.error('Error:', error);
      setFormSubmissionMessage(
        'Form submission unsuccessful .pls try again '
      );
    }
    reset();
  };



  return (
    <div className='p-5 lg:p-10'>
      <h3 className='pb-4 text-4xl font-bold tracking-tight text-gray-500'>
        Evidence Form
      </h3>

      <form
        className='w-[100%] space-y-6 md:w-[328px]'
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className='flex flex-col space-y-4 pb-20'>
          <CreatorsList
            creators={creators}
            onAddCreator={addCreator}
            onNameChange={handleCreatorName}
          />

          <WorkNameInput
            onWorkNameChange={handleWorkName}
            workInput={workName}
          />

          <Medium
            selectedMedium={selectedMedium}
            handleMediumSelected={handleMediumSelected}
            handleAlternativeMedium={handleAlternativeMedium}
            alternativeMedium={alternativeMedium}
          />

          <FileUpload handleFileUpload={handleFileUpload} />
          <CustomDatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <LicenseSelect
            selectedLicense={selectedLicense}
            handleLicenseChange={handleLicenseChange}
            handleLicenseUpload={handleLicenseUpload}
          />
          <FileUploadForLicense
            handleLicenseUpload={handleLicenseUpload}
            selectedLicense={selectedLicense}
          />
        </div>
        <button className='w-full bg-primary py-4 text-white'>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Evidenceform;
