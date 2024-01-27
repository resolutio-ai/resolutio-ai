import { tooltip } from '@/app/assets';
import { LICENSE_OPTIONS } from '@/app/settings';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

type LicenseSelectProps = {};

const LicenseSelect: React.FC<LicenseSelectProps> = ({}) => {
  const { register } = useFormContext();
  return (
    <div className='relative'>
      <label
        htmlFor=''
        className='font-noto-sans mb-2 flex text-sm font-bold leading-tight text-gray-600 '
      >
        License
        <div className=' tooltip relative ml-1 inline-block'>
          <Image src={tooltip} alt='tooltip' className='h-4 w-4' />
          <span className='tooltiptext font-weight-400 leading-18 invisible absolute bottom-full left-1/2 z-10 w-[120px] -translate-x-1/2 transform rounded border bg-white p-[7px] text-center text-xs font-normal text-black'>
            Learn more about Licenses
            <a href='#' className='ml-1 text-xs font-bold text-black underline'>
              here
            </a>
          </span>
        </div>
      </label>

      <select
        className='select select-primary w-full max-w-xs'
        {...register('license')}
      >
        <option disabled defaultValue={'Select a license'}>
          Select a license
        </option>
        {LICENSE_OPTIONS.map((license) => (
          <option key={license}>{license}</option>
        ))}
      </select>
    </div>
  );
};

export default LicenseSelect;
