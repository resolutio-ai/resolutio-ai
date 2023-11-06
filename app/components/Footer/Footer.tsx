import Image from 'next/image';
import { FC } from 'react';


const Footer: FC = () => {
  return (
    <>
      <footer className="footer p-10 bg-black text-neutral-content flex flex-col">
        <div className='flex flex-col w-full md:flex-row items-center gap-5'>

          <aside className='flex-0 '>
            <Image src="/logo_linear_rectangle.svg" alt="" width={200} height={50} />
          </aside>
          <div className="flex-1 text-center text-3xl">
            {"Want to learn more ? Let's talk."}
          </div>
          <nav className='flex-0 justify-end'>
            <div className="grid grid-flow-col gap-4 ">
              <a target="_blank" rel="noopener" href="https://discord.gg/24my5DbuS9" title='Resolutio Discord'><Image src="/discord.svg" alt="" width={30} height={10} /></a>
              <a target="_blank" rel="noopener" href="https://twitter.com/resolutio_nft" title='Resolutio Twitter'><Image src="/twitter.svg" alt="" width={30} height={10} /></a>
              <a target="_blank" rel="noopener" href="https://www.linkedin.com/company/dec-resolutio/" title='Resolutio Linkedin'><Image src="/linkedin.svg" alt="" width={30} height={10} /></a>
              <a target="_blank" rel="noopener" href="mailto:resolutio.zs@gmail.com" title='Resolutio Mail'><Image src="/email.svg" alt="" width={30} height={10} /></a>
            </div>
          </nav>
        </div>

        <aside className='flex flex-row w-full justify-center'>
          <p className='w-11/12 justify-center text-center'>
            resolutio © Copyright {(new Date().getFullYear())}. All Rights Reserved.
          </p>
        </aside>
      </footer>
    </>
  )
};

export default Footer;
