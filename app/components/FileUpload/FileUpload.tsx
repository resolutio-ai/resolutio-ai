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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const files: File[] = watch(name);

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
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
        <div>
          {!!files?.length && (
            <div className='mt-2 grid grid-cols-4 gap-1'>
              {files.map((file) => {
                return (
                  <div key={file.name}>
                    {/* <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: '100px', height: '100px' }}
                    /> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
