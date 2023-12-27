import { FC } from 'react';

import Evidenceform from '@/app/components/Evidence/form';
import SideImage from '@/app/components/Evidence/sideImage';
import "./evidence.scss";



const Evidence: FC = () => {
  return  <div> 
  <div className="sm:flex w-full h-full "> 
    <div className="lg:w-1/2 lg:pt-10 md:w-full  ">
      <Evidenceform />
    </div>
    <div className="lg:w-1/2 md:w-full">
      <SideImage />
    </div>
  </div>
</div>
};

export default Evidence;
