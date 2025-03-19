import {
  EvidenceFromData,
  useEvidenceForm
} from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { workDetailsSchema } from '@/app/schemas';
import { DEFAULT_MEDIUM, MEDIUM_OPTIONS } from '@/app/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form';
import { ErrorMsg } from '../../error-msg/ErrorMsg';
import { FileUpload } from '../../file-upload/FileUpload';
import FormNavigator from '../FormNavigator/FormNavigator';

type WorkDetails = Pick<
  EvidenceFromData,
  'nameOfWork' | 'medium' | 'dateOfCreation' | 'file'
>;

const WorkName = () => {
  const { register } = useFormContext<WorkDetails>();
  return (
    <div>
      <label className='text-sm font-bold text-gray-600' htmlFor='nameOfWork'>
        Name of Work
      </label>
      <input
        type='text'
        id='nameOfWork'
        className='input input-primary mt-2 w-full'
        placeholder='Enter name of work'
        {...register('nameOfWork')}
      />
      <ErrorMsg name='nameOfWork' />
    </div>
  );
};
const MediumSelector = () => {
  const { register } = useFormContext<WorkDetails>();
  return (
    <div>
      <label className='text-sm font-bold text-gray-600' htmlFor='medium'>
        Medium
      </label>
      <select
        className='select select-primary mt-2 w-full'
        id='medium'
        {...register('medium')}
      >
        <option disabled>{DEFAULT_MEDIUM}</option>
        {MEDIUM_OPTIONS.map((medium) => (
          <option key={medium}>{medium}</option>
        ))}
      </select>
      <ErrorMsg name='medium' />
    </div>
  );
};
const DateOfCreation = () => {
  const { control, setValue, getValues } = useFormContext<WorkDetails>();

  const [date, setDate] = useState<Date>(getValues('dateOfCreation'));

  const handleDateChange = (
    date: Date | null,
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | undefined
  ) => {
    if (!date) return;

    // This is close the react-datepicker when a date is selected(Know Issue when inside a label element)
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    setValue('dateOfCreation', date, {
      shouldDirty: true
    });
    setDate(date);
  };

  return (
    <>
      <label
        className='text-sm font-bold text-gray-600'
        htmlFor='dateOfCreation'
      >
        Date of Creation
      </label>
      <Controller
        name='dateOfCreation'
        control={control}
        defaultValue={date}
        render={() => (
          <DatePicker
            selected={date}
            id='dateOfCreation'
            dateFormat='dd/MM/yyyy'
            className='input input-primary w-full'
            placeholderText='Select date'
            maxDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      />
      <ErrorMsg name='dateOfCreation' />
    </>
  );
};
const WorkUpload = () => {
  return (
    <>
      <FileUpload name='file' label='Upload Work' />
      <ErrorMsg name='file' />
    </>
  );
};

const WorkDetails = () => {
  const { formData, nextStep, updateForm } = useEvidenceForm();
  const methods = useForm<WorkDetails>({
    defaultValues: {
      nameOfWork: formData?.nameOfWork,
      medium: formData?.medium,
      dateOfCreation: formData?.dateOfCreation,
      file: formData?.file
    },
    resolver: zodResolver(workDetailsSchema)
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: WorkDetails) => {
    updateForm(data);
    nextStep();
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='animate-fadeIn'>
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
