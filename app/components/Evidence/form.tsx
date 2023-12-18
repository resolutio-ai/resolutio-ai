'use client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import dropdownicon from '../../assets/dropdownicon.svg';
import fileUpload from '../../assets/fileUpload.svg';
import tooltip from '../../assets/tooltip.svg';
import './form.scss';

interface Creator {
  id: number;
  name: string;
}

export default function Form() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // setFile(e.target.files[0]);
  };
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };
  const [creators, setCreators] = useState<Creator[]>([{ id: 1, name: '' }]);

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
  const [selectedLicense, setSelectedLicense] = useState<string>('');

  const handleLicenseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLicense(event.target.value);
  };

 
  const handleLicenseUpload = (e:ChangeEvent<HTMLInputElement>) => {
    // Your file upload logic here
  };

  return (
    <div>
      <div className='flex flex-col p-10 w-[100%]'>
        <h3 className=' font-dm-sans pb-4 text-4xl font-bold tracking-tight text-gray-500'>
          Evidence Form
        </h3>
        <form action='' className='flex w-[328px] flex-col   '>
          <div className='flex flex-col space-y-4 pb-20'>
            <div>
              <label className='font-noto-sans text-sm font-bold leading-tight text-gray-600'>
                Name of Creator
              </label>
              {creators.map((creator) => (
                <div key={creator.id}>
                  <input
                    className='focus:shadow-outline mb-2 flex w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none'
                    id={`name${creator.id}`}
                    type='text'
                    placeholder='Enter name'
                    value={creator.name}
                    onChange={(e) =>
                      handleNameChange(creator.id, e.target.value)
                    }
                  />
                </div>
              ))}
              <div
                onClick={addCreator}
                className='flex cursor-pointer text-right '
              >
                <p className='font-weight: 400 w-[100%] px-2  text-base  leading-tight'>
                  <span className='align-center px-2 text-lg text-primary  '>
                    &#43;
                  </span>
                  Add Co-creators
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor=''
                className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
              >
                {' '}
                Name of Work
              </label>
              <input
                className='focus:shadow-outline flex w-[100%] appearance-none flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3  leading-tight text-gray-700 shadow focus:outline-none '
                id='name1'
                type='text'
                placeholder='Enter name of Work'
              />
            </div>
            <div className='relative'>
              <label
                htmlFor=''
                className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
              >
                Medium
              </label>
              <select className=' align-center focus:shadow-outline block flex flex w-[100%] appearance-none flex-col flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none  '>
                <option
                  className=' leading-tight text-gray-400'
                  disabled
                  selected
                >
                  Select{' '}
                </option>
                <option>Film</option>
                <option>Photo</option>
                <option>Music</option>
                <option>AI</option>
                <option>Art</option>
                <option>Other</option>
              </select>
              <div className=' align-center pointer-events-none absolute inset-y-0 right-0 flex flex items-center justify-center pr-4 pt-5 text-gray-700'>
                <Image src={dropdownicon} alt='tooltip' className='h-5 w-5' />
              </div>
            </div>

            <div className='relative'>
              <label
                htmlFor='fileUpload'
                className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
              >
                File
              </label>
              <div className='focus:shadow-outline flex w-[100%] items-center rounded-md border border-solid border-[#5F437F] py-3 leading-tight text-gray-700 shadow focus:outline-none'>
                <label
                  htmlFor='upload'
                  className='w-full cursor-pointer pl-4 text-left leading-tight text-gray-400 '
                >
                  Enter name of work
                  <div className='align-center absolute inset-y-0 right-0 flex flex cursor-pointer items-center justify-between pr-4 pt-5 text-gray-700'>
                    <Image src={fileUpload} alt='tooltip' className='h-5 w-5' />
                  </div>
                </label>

                <input
                  type='file'
                  id='upload'
                  accept='image/*'
                  onChange={(e) => handleFileUpload(e)}
                  className='hidden'
                />
              </div>
            </div>

            <div className='relative '>
              <label
                htmlFor=''
                className='font-noto-sans text-sm font-bold leading-tight text-gray-600 '
              >
                {' '}
                Date of Creation
              </label>
              <input
                type='date'
                className='   custom-datepicker focus:shadow-outline flex w-[100%] appearance-none items-center rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 placeholder-gray-400 shadow focus:outline-none'
                placeholder='Select date'
              />
            </div>
            <div className='relative'>
              <label
                htmlFor=''
                className='font-noto-sans flex text-sm font-bold leading-tight text-gray-600'
              >
                License
                <div className='tooltip'>
                  {' '}
                  <Image src={tooltip} alt='tooltip' className='h-4 w-4  ' />
                  <span className='tooltiptext text-sm shadow-md'>
                    Learn more about Licenses{' '}
                    <a href='#' className='tooltip__link'>
                      here
                    </a>
                  </span>
                </div>
              </label>

              <select 
              value={selectedLicense}
              onChange={handleLicenseChange}
              className='form-select  appearance-none align-center	 focus:shadow-outline block flex flex w-[100%] appearance-none appearance-none flex-col flex-col items-center justify-center gap-2 rounded-md border border-solid border-[#5F437F] px-4 py-3 leading-tight text-gray-700 shadow focus:outline-none  '>
                <option
                  className=' leading-tight text-gray-400'
                  disabled
                  selected
                >
                  Select{' '}
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  CC BY
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  CC BY-SA
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  CC BY-NC
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  CC BY-NC-SA
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  CC BY-NC-ND
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  CCO
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  resolution License
                </option>
                <option className='mb-3	 appearance-none hover:bg-primary '>
                  Your own license
                </option>
              </select>

              <div className=' align-center pointer-events-none absolute inset-y-0 right-0 flex flex items-center justify-center pr-4 pt-5 text-gray-700'>
                <Image src={dropdownicon} alt='tooltip' className='h-5 w-5' />
              </div>
            </div>
            
            {selectedLicense === 'Your own license' && (

            <div className='relative'>
              <label
                htmlFor='fileUpload'
                className='font-noto-sans text-sm font-bold leading-tight text-gray-600'
              >
                File
              </label>
              <div className='focus:shadow-outline flex w-[100%] items-center rounded-md border border-solid border-[#5F437F] py-3 leading-tight text-gray-700 shadow focus:outline-none'>
                <label
                  htmlFor='upload'
                  className='w-full cursor-pointer pl-4 text-left leading-tight text-gray-400 '
                >
                  Upload file
                  <div className='align-center absolute inset-y-0 right-0 flex flex cursor-pointer items-center justify-between pr-4 pt-0 text-gray-700'>
                    <Image src={fileUpload} alt='tooltip' className='h-5 w-5' />
                  </div>
                </label>

                <input
                  type='file'
                  id='upload'
                  accept='image/*'
                  onChange={(e) => handleLicenseUpload(e)}
                  className='hidden'
                />
              </div>
              <span className='flex mt-2 align-center'>
              <Image src={tooltip} alt='tooltip' className='h-3 w-3  ' />

                <small className='text-[10px] pl-1'>Create your own license using the Resolutio template <a href="#" className='text-primary'><strong><u>here</u></strong></a>.</small>
              </span>
            </div>
            
                  )}


          </div>
          <button className=' bg-primary px-20 py-4 text-white'> Submit</button>
        </form>
      </div>
    </div>
  );
}
