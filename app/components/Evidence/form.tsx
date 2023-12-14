"use client"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import dropdownicon from "../../assets/dropdownicon.svg";
import fileUpload from "../../assets/fileUpload.svg";
import tooltip from "../../assets/tooltip.svg";
import "./form.scss";


interface Creator {
  id: number;
  name: string;
}

export default function Form() {

    const [file, setFile] = useState(null);
    

    const  handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        // setFile(e.target.files[0]);
    };
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value);
    };
    const [creators, setCreators] = useState<Creator[]>([{ id: 1, name: '' }]);

  const addCreator = () => {
    const newId = creators.length + 1;
    setCreators([...creators, { id: newId, name: '' }]);
  };

  const handleNameChange = (id: number, value: string) => {
    setCreators((prevCreators) =>
      prevCreators.map((creator) => (creator.id === id ? { ...creator, name: value } : creator))
    );
  };

   
    

  return (
    <div>
        <div className="flex p-10 flex-col">
            <h3
             className="pb-4 text-gray-500 font-dm-sans text-4xl font-bold tracking-tight">
                Evidence Form
            </h3>
            <form action="" className="w-[328px] flex flex-col   ">  
            <div className="flex space-y-4 flex-col pb-20">
                <div>
                   <label className="text-gray-600 font-noto-sans text-sm font-bold leading-tight">
                    Name of Creator
                  </label>
                  {creators.map((creator) => (
                  <div key={creator.id}>
                    
                    <input
                      className="shadow mb-2 appearance-none rounded-md border border-solid border-[#5F437F] flex flex-col items-center justify-center py-3 px-4 gap-2 w-[100%] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={`name${creator.id}`}
                      type="text"
                      placeholder="Enter name"
                      value={creator.name}
                      onChange={(e) => handleNameChange(creator.id, e.target.value)}
                    />
                  </div>
                ))}
                <div 
                onClick={addCreator} 
                className="flex cursor-pointer text-right ">
                  <p className="text-base font-weight: 400 leading-tight  px-2  w-[100%]">
                  <span className="text-primary text-lg px-2 align-center  ">&#43;</span>
                  Add Co-creators
                  </p>
                   </div>
                </div>

                <div>
                    <label htmlFor=""  className="text-gray-600 font-noto-sans text-sm font-bold leading-tight"> Name of Work</label>
                    <input 
                    className="shadow appearance-none rounded-md border border-solid border-[#5F437F] flex flex-col items-center justify-center py-3 px-4 gap-2 w-[100%]  text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id="name1" type="text" placeholder="Enter name of Work"/>
             
                </div>
                <div className="relative">
                    <label htmlFor=""  className="text-gray-600 font-noto-sans text-sm font-bold leading-tight">Medium</label>
                    <select
                    className=" align-center flex flex-col text-gray-700 leading-tight block shadow appearance-none rounded-md border border-solid border-[#5F437F] focus:outline-none focus:shadow-outline flex flex-col items-center justify-center py-3 px-4 gap-2 w-[100%]  ">
                        <option className=" text-gray-400 leading-tight" disabled selected  >Select </option>
                        <option>Film</option>
                        <option>Photo</option>
                        <option>Music</option>
                        <option>AI</option>
                        <option>Art</option>
                        <option>Other</option>
                    </select>
                    <div className=" pointer-events-none absolute inset-y-0 right-0 flex items-center pt-5 pr-4 justify-center align-center flex text-gray-700">
                    <Image src={dropdownicon} alt="tooltip" className="h-5 w-5"/>
                    </div>
                </div>
                


              <div className="relative">
                  <label
                    htmlFor="fileUpload"
                    className="text-gray-600 font-noto-sans text-sm font-bold leading-tight"
                  >
                    File
                  </label>
                  <div className="shadow rounded-md border border-solid border-[#5F437F] flex items-center w-[100%] py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <label
                      htmlFor="upload"
                      className="text-left pl-4 cursor-pointer w-full text-gray-400 leading-tight "
                    >
                      Enter name of work

                    <div  className="cursor-pointer absolute inset-y-0 right-0 flex items-center pt-5 pr-4 justify-between align-center flex text-gray-700">
                    <Image src={fileUpload} alt="tooltip" className="h-5 w-5"/>

                    </div>
                    </label>

                    <input
                      type="file"
                      id="upload"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e)}
                      className="hidden"
                    />
                  </div>
                </div>

                
              <div className="relative ">
              <label htmlFor=""  className="text-gray-600 font-noto-sans text-sm font-bold leading-tight "> Date of Creation</label>
              <input
              type="date"
              className="   custom-datepicker appearance-none px-4 placeholder-gray-400 shadow rounded-md border border-solid border-[#5F437F] flex items-center w-[100%] py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Select date"
              />

             </div>
            <div className="relative">
              <label htmlFor=""  
              className="text-gray-600 font-noto-sans text-sm font-bold leading-tight">License
              <span className="tooltip px-1" data-tip="Learn more about Licenses here">
              <Image src={tooltip} alt="tooltip" className="w-4 h-3"/>
            </span>
              </label>
              <select
             
              className="form-select appearance-none	 align-center flex flex-col text-gray-700 leading-tight block shadow appearance-none rounded-md border border-solid border-[#5F437F] focus:outline-none focus:shadow-outline flex flex-col items-center justify-center py-3 px-4 gap-2 w-[100%]  ">
                  <option className=" text-gray-400 leading-tight" disabled selected  >Select </option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">CC BY</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">CC BY-SA</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">CC BY-NC</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">CC BY-NC-SA</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">CC BY-NC-ND</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">CCO</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">resolution License</option>
                  <option className="appearance-none	 hover:bg-primary mb-3 ">Your own license</option>
              </select>
              <div className=" pointer-events-none absolute inset-y-0 right-0 flex items-center pt-5 pr-4 justify-center align-center flex text-gray-700">
              <Image src={dropdownicon} alt="tooltip" className="h-5 w-5"/>

                </div>
                </div>
                </div>
            <button className=" bg-primary px-20 text-white py-4"> Submit</button>

            </form>
        </div>
    </div>
  )
}
