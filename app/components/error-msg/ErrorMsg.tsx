import { FieldValues, get, Path, useFormContext } from 'react-hook-form';

type ErrorMsgProps<T extends FieldValues> = {
  name: Path<T>;
};

export const ErrorMsg = <T extends FieldValues>({ name }: ErrorMsgProps<T>) => {
  const {
    formState: { errors }
  } = useFormContext<T>();

  const error = get(errors, name);
  const message = (error?.message || error?.root?.message) ?? '';

  return (
    <div className='min-h-6'>
      {message && <span className='text-xs text-red-500'>{message}</span>}
    </div>
  );
};
