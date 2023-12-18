import { FC } from 'react';

import "./evidence.scss"
import Form from '@/app/components/Evidence/form';
import SideImage from '@/app/components/Evidence/sideImage';



const Evidence: FC = () => {
  return  <div className="evidence__container"> 
  <div className="sm:flex w-full"> 
    <div className="lg:w-1/2 lg:pt-10 sm:w-full  ">
      <Form />
    </div>
    <div className="lg:w-1/2 sm:w-full">
      <SideImage />
    </div>
  </div>
</div>
};

export default Evidence;
