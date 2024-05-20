import {
  EvidenceFromData,
  useEvidenceForm,
} from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { workDetailsSchema } from '@/app/schemas';
import { DEFAULT_MEDIUM, MEDIUM_OPTIONS } from '@/app/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import FileUpload from '../../FileUpload/FileUpload';
import FormNavigator from '../FormNavigator/FormNavigator';

type WorkDetails = Pick<
  EvidenceFromData,
  'nameOfWork' | 'medium' | 'dateOfCreation' | 'file'
>;

const WorkName: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WorkDetails>();
  return (
    <>
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
      <div className='mt-1 min-h-6'>
        {errors.nameOfWork && (
          <span className='text-xs text-red-500'>
            {errors.nameOfWork?.message}
          </span>
        )}
      </div>
    </>
  );
};
const MediumSelector: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<WorkDetails>();
  return (
    <div>
      <label className='mt-2w-full form-control'>
        <div className='label'>
          <span className='label-text text-sm font-bold text-gray-600'>
            Medium
          </span>
        </div>
        <select
          className='select select-primary w-full'
          {...register('medium')}
        >
          <option disabled>{DEFAULT_MEDIUM}</option>
          {MEDIUM_OPTIONS.map((medium) => (
            <option key={medium}>{medium}</option>
          ))}
        </select>
      </label>
      <div className='mt-1 min-h-6'>
        {errors.medium && (
          <span className='text-xs text-red-500'>{errors.medium?.message}</span>
        )}
      </div>
    </div>
  );
};
const DateOfCreation: FC = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<WorkDetails>();

  const [date, setDate] = useState<Date>(getValues('dateOfCreation'));

  const handleDateChange = (
    date: Date | null,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!date) return;

    // This is close the react-datepicker when a date is selected(Know Issue when inside a label element)
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    setValue('dateOfCreation', date, {
      shouldDirty: true,
    });
    setDate(date);
  };

  return (
    <>
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text text-sm font-bold text-gray-600'>
            Date of Creation
          </span>
        </div>
        <Controller
          name='dateOfCreation'
          control={control}
          defaultValue={date}
          render={() => (
            <DatePicker
              selected={date}
              id='dateOfCreation'
              dateFormat='dd/MM/yyyy'
              className='input input-bordered input-primary w-full'
              placeholderText='Select date'
              maxDate={new Date()}
              onChange={handleDateChange}
            />
          )}
        />
      </label>
      <div className='mt-1 min-h-6'>
        {errors.dateOfCreation && (
          <span className='text-xs text-red-500'>
            {errors.dateOfCreation?.message}
          </span>
        )}
      </div>
    </>
  );
};
const WorkUpload: FC = () => {
  const {
    formState: { errors },
  } = useFormContext<WorkDetails>();

  return (
    <>
      <FileUpload name='file' label='Upload Work' />
      <div className='mt-1 min-h-6'>
        {errors.file && (
          <span className='text-xs text-red-500'>{errors.file?.message}</span>
        )}
      </div>
    </>
  );
};

const WorkDetails: FC = () => {
  const { formData, nextStep, updateForm } = useEvidenceForm();
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
    updateForm(data);
    nextStep();
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <WorkName />
          <MediumSelector />
          <DateOfCreation />
          <WorkUpload />
          <FormNavigator />
        </form>
      </FormProvider>
    </div>
  );
};

export default WorkDetails;
