import { XCircleIcon } from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

type FileUploadProps = {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export const FileUpload = (props: FileUploadProps) => {
  const { name = '', label = name } = props;
  const { register, unregister, setValue, watch } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, acceptedFiles, { shouldValidate: true });
    },
    [name, setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const removeFile = () => {
    setValue(name, []);
  };

  const uploads: File[] = watch(name) ?? [];

  useEffect(() => {
    register(name);
  }, [register, unregister, name]);

  return (
    <>
      <label
        className='mb-2 block text-sm font-bold text-gray-700 capitalize'
        htmlFor={name}
      >
        {label}
      </label>
      <div
        className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'
        {...getRootProps()}
      >
        <div className='text-center'>
          <PhotoIcon
            aria-hidden='true'
            className='mx-auto size-12 text-gray-300'
          />
          <div className='mt-4 flex flex-col text-sm text-gray-600'>
            <input
              {...props}
              {...getInputProps()}
              id={name}
              className='hidden'
            />

            {isDragActive ? (
              <p className='pl-1 font-semibold text-indigo-600'>
                {"Drag 'n' drop file here"}
              </p>
            ) : (
              <>
                <span className='relative cursor-pointer rounded-md bg-white px-3 font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                  Upload a file
                </span>
                <span>or</span>
                <p>drag and drop</p>
              </>
            )}
          </div>
          <p className='mt-2 text-xs text-gray-600'>
            PNG, JPG, JPEG, WEBP up to 10MB
          </p>
        </div>
      </div>
      <div>
        <div className='mt-2'>
          {uploads.map((file) => {
            return (
              <div key={file.name} className='flex'>
                <span className='mr-2'>{file.name}</span>
                <button className='mr-2 cursor-pointer' onClick={removeFile}>
                  <XCircleIcon height='24' className='text-red-500' />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
