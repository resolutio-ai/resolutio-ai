import { tooltip } from '@/app/assets';
import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { licenseSchema } from '@/app/schemas';
import { LICENSE_OPTIONS } from '@/app/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

type Licensing = z.infer<typeof licenseSchema>;

const LicenseSelector = () => {
  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label justify-start'>
        <span className='label-text text-sm font-bold text-gray-600'>
          License
        </span>
        <div className='tooltip relative ml-1 inline-block'>
          <Image src={tooltip} alt='tooltip' className='h-4 w-4' />
          <span className='tooltiptext font-weight-400 leading-18 invisible absolute bottom-full left-1/2 z-10 w-[120px] -translate-x-1/2 transform rounded border bg-white p-[7px] text-center text-xs font-normal text-black'>
            <span>Learn more about Licenses</span>
            <a href='#' className='ml-1 text-xs font-bold text-black underline'>
              here
            </a>
          </span>
        </div>
      </div>
      <select className='select select-primary w-full max-w-xs'>
        <option disabled defaultValue={'Select a license'}>
          Select a license
        </option>
        {LICENSE_OPTIONS.map((license) => (
          <option key={license}>{license}</option>
        ))}
      </select>
    </label>
  );
};

const License = () => {
  const { previousStep, formData, nextStep, updateForm } = useEvidenceForm();

  const methods = useForm<Licensing>({
    defaultValues: {
      license: formData.license,
    },
    resolver: zodResolver(licenseSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

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
