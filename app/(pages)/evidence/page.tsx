import { Evidenceform, SideImage } from '@/app/components';
import { FC } from 'react';

const Evidence: FC = () => {
  return (
    <div className='grid md:grid-cols-2'>
      <div className=''>
        <Evidenceform />
      </div>
      <SideImage />
    </div>
  );
};

export default Evidence;
