'use client';
import { ChangeEvent, FC, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './form.scss';
import CreatorsList from './formSections/creatorInput';
import CustomDatePicker from './formSections/dateOfCreation';
import FileUpload from './formSections/fileUpload';
import FileUploadForLicense from './formSections/fileUploadforLicence';
import LicenseSelect from './formSections/licenseSelect';
import Medium from './formSections/medium';
import WorkNameInput from './formSections/workNameInpute';

interface Creator {
  id: number;
  name: string;
}

const Evidenceform: FC = () => {
  const [file, setFile] = useState(null);
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

  return (
    <div>
      <div className=' flex w-[100%] flex-col lg:p-10 p-5 align-center'>
        <h3 className=' font-dm-sans pb-4 text-4xl font-bold tracking-tight text-gray-500'>
          Evidence Form
        </h3>
        <form action='' className='flex sm:w-[328px] flex-col  w-[100%] '>
          <div className='flex flex-col space-y-4 pb-20'>
            <CreatorsList
              creators={creators}
              onAddCreator={addCreator}
              onNameChange={handleNameChange}
            />

            <WorkNameInput />

            <Medium />

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
          </div>
          <button className=' bg-primary  py-4 text-white w-[100%]'> Submit</button>
        </form>
      </div>
    </div>
  );
};
export default Evidenceform;
