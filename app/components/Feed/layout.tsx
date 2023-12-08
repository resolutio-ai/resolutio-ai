import Sidebar from "./sectiions/sidebar/sidebar"




export default function FeedLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div  className=" md:pt-10 h-full ">
    <div  className=" md:pt-5 h-full flex">
       <div
         className=
         "hidden  md:flex md:w-75 md:flex-col w-1/6   md:inset-y-0  bg-white-900  "
         >
             <Sidebar/>
         </div>    
         {children}  
    </div>
    </div>
    )
  }
  