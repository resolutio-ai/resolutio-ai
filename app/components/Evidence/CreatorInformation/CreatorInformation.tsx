import {
  EvidenceFromData,
  useEvidenceForm,
} from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { creatorSchema } from '@/app/schemas';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import {
  FormProvider,
  UseFieldArrayRemove,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import FormNavigator from '../FormNavigator/FormNavigator';
import './CreatorInformation.scss';

type CreatorData = Pick<EvidenceFromData, 'creators'>;

type CreatorInputProps = {
  id: number;
  remove: UseFieldArrayRemove;
};

const CreatorInput: FC<CreatorInputProps> = ({ id, remove }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatorData>();

  const removeCreator = () => {
    remove(id);
  };

  return (
    <>
      <div className='flex'>
        <div className='mr-4 flex-1'>
          <label className='form-control min-w-full'>
            <div className='label'>
              <span className='label-text text-sm font-bold  text-gray-600'>
                Name of Creator
              </span>
            </div>
            <input
              type='text'
              className='input input-bordered input-primary w-full'
              placeholder='Enter name'
              {...register(`creators.${id}.name`)}
            />
          </label>
        </div>
        <div className='flex w-10 items-end'>
          {id > 0 && (
            <div className='tooltip' data-tip='delete'>
              <button className='mr-2' onClick={removeCreator}>
                <XCircleIcon height='36' className=' text-red-500' />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='mt-1 min-h-6'>
        {errors.creators && (
          <span className='text-xs text-red-500'>
            {errors.creators[id]?.name?.message}
          </span>
        )}
      </div>
    </>
  );
};

type CreatorsListProps = {};

const CreatorsList: FC<CreatorsListProps> = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'creators',
  });

  const addCreator = () => {
    append(
      { id: uuidv4(), name: '' },
      {
        shouldFocus: true,
      }
    );
  };

  return (
    <div className='creator-information'>
      <div className='flex justify-end'>
        <button onClick={addCreator} className='add-creator btn' type='button'>
          <PlusCircleIcon height='24' className='text-primary' />
          <span>Add Creator</span>
        </button>
      </div>
      {fields.map((field, index) => (
        <CreatorInput key={field.id} id={index} remove={remove} />
      ))}
    </div>
  );
};

const CreatorInformation: FC = () => {
  const { formData, updateForm, nextStep } = useEvidenceForm();
  const methods = useForm<CreatorData>({
    defaultValues: {
      creators: formData.creators,
    },
    resolver: zodResolver(creatorSchema),
  });
  const { handleSubmit } = methods;

  const onSubmitCreators = (data: CreatorData) => {
    updateForm(data);
    nextStep();
  };

  return (
    <div className='mt-8'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitCreators)}>
          <CreatorsList />
          <FormNavigator />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatorInformation;
