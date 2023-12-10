"use client";

import { dot, evidencForm, eye, messages, saved, users } from "@/app/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Post } from "../../dummydata";
import Search from "../../sectiions/search/header";


export default function Home() {
  const router = useRouter();

  return (
    <div className=" w-5/6  md:pt-5 pr-2   ">
      <Search placeholder={""} />
      <div className=" my-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 align-center md:justify-center md:align-center 
">
        {Post.map((item) => (
          <div className="flex pe-1 flex-col justify-start items-start shrink-0 border-b border-gray-400 pb-5 ">
            <div className="flex justify-between items-center gap-4  py-2 align-center  w-[100%]">
              <div className="flex justify-between items-center gap-2   ">
                <Image 
                src={item.creatorImage} 
                alt={item.creator} 
                width={25} 
                height={25} 
                className=" rounded-[50%]" />
                <p className="color-gray-700 text-center font-dm-sans text-base font-normal font-bold leading-6">
                  <strong>{item.creator} <span className="text-slate-500 font-dmSans text-sm font-normal leading-5">. 5h</span></strong></p>
              </div>
              <div>
                <Image src={dot} className="cursor-pointer" alt="more"/>
              </div>
            </div>

           
            <div className="w-[100%] relative ">
              <Image
               src={item.art} 
               alt={item.description} 
               className="w-[100%] h-447 shrink-0 rounded-md " />
               <div 
               className="absolute top-[10px] right-[20px] w-[35px] rounded-md bg-info bg-white/25 backdrop-blur-sm  flex justify-center p-2  cursor-pointer transition duration-500 ease-in-out">
               <Image
                src={item.artdescription}
                alt={item.description}
                width={25}
                height={25}
              />
               </div>
              
            </div>

            <div className="flex justify-between items-center gap-4  py-2 align-center  w-[100%]  ">
              <div className="flex gap-3 w-80">
              <div className="flex gap-2 align-end ">
                <Image src={eye} alt="more" 
                width={13}
                height={10}
                // className="sm:w-6 sm:h-6"
                className="lg:w-6 lg:h-6"

                /> 
                <span className="text-#262626 text-[13px] font-400 leading-18 align-start pt-1">34,542 views</span></div>
              <div className="flex gap-2">
                <Image src={users} alt="more" 
                width={13}
                height={6}
                // className="sm:w-6 sm:h-6"
                className="lg:w-6 lg:h-6"

                /><span className="text-#262626  text-[13px] font-400 leading-18 align-end pt-1">6 licensees</span></div>
              </div>
              <div className="flex gap-6 sm:gap-3 lg:gap-3">
                <Image 
                src={messages} 
                alt="message"  
                width={40}
                height={10}
                className="lg:w-6 lg:h-6"
                />
                <Image 
                src={saved} 
                alt="save" 
                width={40}
                height={10}
                // className="sm:w-6 sm:h-6"
                className="lg:w-6 lg:h-6"

                 />
                <Image 
                src={evidencForm} 
                alt="add" 
                width={40}
                height={10}
                // className="sm:w-6 sm:h-6"
                className="lg:w-6 lg:h-6"

                 />
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 py-2 align-center w-[100%] flex-wrap sm:flex-wrap-nowrap">
              <p className=" w-80 text-gray-700 text-sm font-weight-normal leading-5 m:w-60">{item.description}</p>
              <Link href="#" 
              className=" rounded-md text-white border border-solid border-primary bg-[#5F437F] px-3 py-1 justify-center items-centertext-white text-sm font-normal font-light leading-6 tracking-tight">
              {item.code}
              </Link>
            </div>

            <div className=" w-[100%] flex ">
            <Link href="#" 
              className="flex sm:w-[50%]   text-primary md:text-left sm:text-right w-[100%] text-sm font-medium line-height-6 leading-6 hover: decoration-slate-400 hover:text-black pt-4 ">
              View more details
            </Link>

            </div>
          </div>
          ))}
      </div>
     
    </div>
  );
}