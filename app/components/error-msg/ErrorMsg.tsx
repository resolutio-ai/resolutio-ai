import { get, useFormContext } from 'react-hook-form';

type ErrorMsgProps = {
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  errors: any;
};

export const ErrorMsg = ({ name, errors }: ErrorMsgProps) => {
  const methods = useFormContext();
  const error = get(errors || methods.formState.errors, name);
  return (
    <div className='mt-1 min-h-6'>
      {error && <span className='text-xs text-red-500'>{error.message}</span>}
    </div>
  );
};
