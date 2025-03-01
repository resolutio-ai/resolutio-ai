import {
  EvidenceFromData,
  useEvidenceForm
} from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { creatorSchema } from '@/app/schemas';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { createId } from '@paralleldrive/cuid2';
import {
  FormProvider,
  UseFieldArrayRemove,
  useFieldArray,
  useForm,
  useFormContext
} from 'react-hook-form';
import FormNavigator from '../FormNavigator/FormNavigator';
import styles from './CreatorInformation.module.css';

type CreatorData = Pick<EvidenceFromData, 'creators'>;

type CreatorInputProps = {
  id: number;
  remove: UseFieldArrayRemove;
};

const CreatorInput = ({ id, remove }: CreatorInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<CreatorData>();

  const removeCreator = () => {
    remove(id);
  };

  return (
    <>
      <div className='flex'>
        <div className='mr-4 flex-1'>
          <label
            className='text-sm font-bold text-gray-600'
            htmlFor={`creators.${id}.name`}
          >
            Name of Creator
          </label>
          <input
            type='text'
            className='input input-primary mt-2 w-full'
            placeholder='Enter name'
            id={`creators.${id}.name`}
            {...register(`creators.${id}.name`)}
          />
        </div>
        <div className='flex w-10 items-end'>
          {id > 0 && (
            <div className='tooltip' data-tip='delete'>
              <button className='mr-2' onClick={removeCreator}>
                <XCircleIcon height='36' className='text-red-500' />
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

const CreatorsList = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'creators'
  });

  const addCreator = () => {
    append(
      { id: createId(), name: '' },
      {
        shouldFocus: true
      }
    );
  };

  return (
    <div className='creator-information'>
      <div className='flex justify-end'>
        <button
          onClick={addCreator}
          className={`add-creator btn ${styles.addCreator}`}
          type='button'
        >
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

const CreatorInformation = () => {
  const { formData, updateForm, nextStep } = useEvidenceForm();
  const methods = useForm<CreatorData>({
    defaultValues: {
      creators: formData.creators
    },
    resolver: zodResolver(creatorSchema)
  });
  const { handleSubmit } = methods;

  const onSubmitCreators = (data: CreatorData) => {
    updateForm(data);
    nextStep();
  };

  return (
    <div className='mt-8'>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitCreators)}
          className='animate-fadeIn'
        >
          <CreatorsList />
          <FormNavigator />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatorInformation;
