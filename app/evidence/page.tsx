import { FC } from 'react';
import Form from '../components/Evidence/form';
import SideImage from '../components/Evidence/sideImage';
import "./evidence.scss"



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
