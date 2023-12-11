import Sidebar from "./sectiions/sidebar/sidebar"




export default function FeedLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div  className=" sm:pt-20    ">
    <div  className=" h-full flex">
       <div
         className=
         "  md:flex md:w-75 md:flex-col w-1/6   md:inset-y-0  bg-white-900   "
         >
             <Sidebar/>
         </div>
         {/* <div className="w-[100%]"> */}
         {children}  
         {/* </div>     */}

    </div>
    </div>
    )
  }
  