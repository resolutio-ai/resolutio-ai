"use client";

import { evidencForm, messages, notification, profile, saved, support } from "@/app/assets/icons";
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
    icon: messages,
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
    <div className='space-y-4 py-4 flex flex-col  bg-gray text-black' >
        <div className="px-3 py-2 flex-1">
            <div  className='flex item-center pl-3 mb-14'>
              <div className="relative w-8 h-8 mr-4">
              <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 bg-primary text-white">Categories</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
        </ul>
        </div>
              </div>
             
            </div>

            <div className="space-y-1">
            {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className= "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-primary rounded-lg transition text-black bg-white/10"
              
            >
              <div className="flex items-center flex-1">
                <Image src={route.icon} className="h-5 w-5 mr-3 hover:bg-primary " alt={route.label}/>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Sidebar