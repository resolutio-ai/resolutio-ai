import { tooltip } from '@/app/assets';
import {
  EvidenceFromData,
  useEvidenceForm,
} from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { licenseSchema } from '@/app/schemas';
import { DEFAULT_LICENSE, LICENSE_OPTIONS } from '@/app/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { FC } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import FileUpload from '../../FileUpload/FileUpload';

type Licensing = Pick<EvidenceFromData, 'license' | 'ownLicense'>;

const LicenseSelector: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Licensing>();

  return (
    <>
      <label className='form-control w-full'>
        <div className='label justify-start'>
          <span className='label-text text-sm font-bold text-gray-600'>
            License
          </span>
          <div className='tooltip relative ml-1 inline-block'>
            <Image src={tooltip} alt='tooltip' className='h-4 w-4' />
            <span className='tooltiptext font-weight-400 leading-18 invisible absolute bottom-full left-1/2 z-10 w-[120px] -translate-x-1/2 transform rounded border bg-white p-[7px] text-center text-xs font-normal text-black'>
              <span>Learn more about Licenses</span>
              <a
                href='#'
                className='ml-1 text-xs font-bold text-black underline'
              >
                here
              </a>
            </span>
          </div>
        </div>
        <select
          className='select select-primary w-full'
          {...register('license')}
        >
          <option disabled>{DEFAULT_LICENSE}</option>
          {LICENSE_OPTIONS.map((license) => (
            <option key={license}>{license}</option>
          ))}
        </select>
      </label>
      <div className='mt-1 min-h-6'>
        {errors.license && (
          <span className='text-xs text-red-500'>
            {errors.license?.message}
          </span>
        )}
      </div>
    </>
  );
};

const OwnLicenseUpload = () => {
  const {
    formState: { errors },
  } = useFormContext<Licensing>();
  return (
    <>
      <FileUpload name='file' label='Upload Work' />
      <div className='mt-1 min-h-6'>
        {errors.ownLicense && (
          <span className='text-xs text-red-500'>
            {errors.ownLicense?.message}
          </span>
        )}
      </div>
    </>
  );
};

const License: FC = () => {
  const { previousStep, formData, nextStep, updateForm } = useEvidenceForm();
  const methods = useForm<Licensing>({
    defaultValues: {
      license: formData.license,
      ownLicense: formData.ownLicense,
    },
    resolver: zodResolver(licenseSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = (data: Licensing) => {
    console.log(data);
    updateForm(data);
    nextStep();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LicenseSelector />
          <OwnLicenseUpload />
          <div className='mt-8 flex justify-end'>
            <button
              className='btn-secondary btn mr-8'
              type='button'
              onClick={previousStep}
            >
              Previous
            </button>
            <button className='btn-primary btn' type='submit'>
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default License;
