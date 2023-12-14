import { FC } from 'react';
import Form from '../components/Evidence/form';
import SideImage from '../components/Evidence/sideImage';
// import 'flowbite-datepicker';
// import 'flowbite/dist/datepicker.turbo.js';



const Evidence: FC = () => {
  return <div className=" sm:pt-10 ">
    <div className='flex w-[100%] '>
      <div className='w-1/2 sm:pt-5 '>
      <Form/>

      </div>
      <div className='w-1/2 '>
      <SideImage/>

      </div>
    </div>
  </div>;
};

export default Evidence;
