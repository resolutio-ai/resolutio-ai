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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [creators, setCreators] = useState<Creator[]>([{ id: 1, name: '' }]);
  const [selectedLicense, setSelectedLicense] = useState<string>('');

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // setFile(e.target.files[0]);
  };

  const addCreator = () => {
    const newId = creators.length + 1;
    setCreators([...creators, { id: newId, name: '' }]);
  };

  const handleNameChange = (id: number, value: string) => {
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
    // Your file upload logic here
  };

  const onSubmit: SubmitHandler<EvidenceFromDto> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className='p-5 lg:p-10'>
      <h3 className='pb-4 text-4xl font-bold tracking-tight text-gray-500'>
        Evidence Form
      </h3>
      <form
        className='w-[100%] space-y-6 md:w-[328px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <CreatorsList
          creators={creators}
          onAddCreator={addCreator}
          onNameChange={handleNameChange}
        />
        <WorkNameInput register={register} />
        <Medium register={register} />
        <FileUpload handleFileUpload={handleFileUpload} />
        <CustomDatePicker
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
        <LicenseSelect
          selectedLicense={selectedLicense}
          handleLicenseChange={handleLicenseChange}
          handleLicenseUpload={handleFileUpload}
        />
        <FileUploadForLicense
          handleLicenseUpload={handleLicenseUpload}
          selectedLicense={selectedLicense}
        />
        <button className='btn-primary btn w-full' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Evidenceform;
