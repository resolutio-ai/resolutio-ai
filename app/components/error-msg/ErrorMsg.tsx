import { get, useFormContext } from 'react-hook-form';

type ErrorMsgProps = {
  name: string;
};

export const ErrorMsg = ({ name }: ErrorMsgProps) => {
  const {
    formState: { errors }
  } = useFormContext();
  const error = get(errors, name);
  return (
    <div className='mt-1 min-h-6'>
      {error && <span className='text-xs text-red-500'>{error.message}</span>}
    </div>
  );
};
