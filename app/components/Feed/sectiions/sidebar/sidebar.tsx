"use client";

import { evidencForm, home, messages, notification, profile, saved, support } from "@/app/assets/icons";
import { Montserrat } from 'next/font/google';
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Routes {
  label: string;
  icon: StaticImageData;
  href: string;
}


const montserrat = Montserrat ({ weight: "600", subsets:["latin"]})

const routes:Routes[] = [
  {
    label: 'Home',
    icon: home,
    href: '/components/Feed',
  },
  {
    label: 'Message',
    icon: messages,
    href: '/components/Feed/Message',
  },
  {
    label: 'Notification',
    icon: notification,
    href: '/Notification',
  },
  {
    label: 'Evidence form',
    icon: evidencForm,
    href: '/EvidenceForm',
  },
  {
    label: 'Saved',
    icon: saved,
    href: '/Saves',
  },
  {
    label: 'Support',
    icon: support,
    href: '/Support',
  },
  {
    label: 'Profile',
    icon: profile,
    href: '/Profile',
  },
];


function Sidebar() {

  const pathname = usePathname();

  return (
<div className="space-y-4 md:pt-5 flex flex-col   text-black ">
        <div className="px-3  flex-1">
            <div  className='flex item-center  mb-5'>
              <div className="relative ">
              <div className="dropdown dropdown-bottom  hover:text-white   ">
                <div tabIndex={0} role="button" 
                  className=" gap-10  text-white bg-primary text-white border-none hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-md text-sm px-5 py-4 text-center inline-flex items-center w-[100%]  "
            >
              <p className="hidden md:inline sm:hidden">Categories</p> 
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
                  
                </div>
                <ul tabIndex={0}
                 className="dropdown-content  z-[1] menu text-primary bg-white divide-y divide-gray-100 rounded-md shadow w-44"
                 >
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
              </div>
              </div>
             
            </div>

        


            <div className="space-y-2 ">
            {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-primary  rounded-lg transition text-black bg-white/10 md:p-4"
              
            >
              <div className="flex items-center flex-1">
                <Image src={route.icon}
                  className="h-5 w-5 mr-3 fill-transparent stroke-purple-700 transition duration-300 ease-in-out hover:fill-purple-700 md:h-6 md:w-6"

                alt={route.label}/>
                <span className="hidden md:inline sm:hidden">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Sidebar