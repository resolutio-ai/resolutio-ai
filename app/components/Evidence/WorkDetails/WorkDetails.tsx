import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { workDetailsSchema } from '@/app/schemas';
import { MEDIUM_OPTIONS } from '@/app/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

type WorkDetails = z.infer<typeof workDetailsSchema>;

const MediumSelector: FC = () => {
  const { register } = useFormContext();
  return (
    <label className='form-control mt-4 w-full'>
      <div className='label'>
        <span className='label-text text-sm font-bold text-gray-600'>
          Medium
        </span>
      </div>
      <select className='select select-primary w-full' {...register('medium')}>
        <option disabled defaultValue={'Select a medium'}>
          Select a medium
        </option>
        {MEDIUM_OPTIONS.map((medium) => (
          <option key={medium}>{medium}</option>
        ))}
      </select>
    </label>
  );
};

const WorkName: FC = () => {
  const { register } = useFormContext();
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text text-sm font-bold  text-gray-600'>
          Name of Work
        </span>
      </div>
      <input
        type='text'
        className='input input-bordered input-primary w-full'
        placeholder='Enter name of Work'
        {...register('nameOfWork')}
      />
    </label>
  );
};

const WorkDetails = () => {
  const { previousStep, formData, nextStep, updateForm } = useEvidenceForm();
  const methods = useForm<WorkDetails>({
    defaultValues: {
      nameOfWork: formData?.nameOfWork,
      medium: formData?.medium,
      dateOfCreation: formData?.dateOfCreation,
      file: formData?.file,
    },
    resolver: zodResolver(workDetailsSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: WorkDetails) => {
    console.log(data);
    updateForm(data);
    nextStep();
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <WorkName />
          <MediumSelector />
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

export default WorkDetails;
