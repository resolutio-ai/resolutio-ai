import Image from 'next/image'
import mon from "../../assets/unsplash_Kv1hYl9LlxU.png"

export default function SideImage() {
  return (
    <div className='relative'>
      <Image src={mon} alt='monalisa'className='object-cover object-center h-full w-full'/>
      <p 
        className="absolute bottom-10 right-20 p-4 bg-white rounded-sm shadow-lg text-primary px-3 py-2" >Artist details link</p>

    </div>
  )
}
