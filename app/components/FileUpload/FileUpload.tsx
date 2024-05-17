import { XCircleIcon } from '@heroicons/react/24/outline';
import { FC, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

type FileUploadProps = {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const FileUpload: FC<FileUploadProps> = (props) => {
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
    multiple: false,
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
        className='mb-2 block text-sm font-bold capitalize text-gray-700'
        htmlFor={name}
      >
        {label}
      </label>
      <div {...getRootProps()}>
        <input
          {...props}
          {...getInputProps()}
          id={name}
          className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        />
        <div
          className={
            'flex h-32 w-full items-center justify-center rounded border border-dashed border-primary p-2 '
          }
        >
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className='my-2 text-center'>
              {"Drag 'n' drop file here, or click to select files"}
            </p>
          )}
        </div>
      </div>
      <div>
        <div className='mt-2'>
          {uploads.map((file) => {
            return (
              <div key={file.name} className='flex'>
                <span className='mr-2'>{file.name}</span>
                <button className='mr-2' onClick={removeFile}>
                  <XCircleIcon height='24' className=' text-red-500' />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
{
  /* <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: '100px', height: '100px' }}
                    /> */
}

export default FileUpload;
