import Image from 'next/image';
import { FC } from 'react';

import './Footer.scss';

const Footer: FC = () => {
  return (
    <footer className='footer flex flex-col bg-black p-10 text-neutral-content'>
      <div className='flex w-full flex-col items-center gap-5 md:flex-row'>
        <aside className='flex-0'>
          <Image
            src='/logo_linear_rectangle.svg'
            alt='resolution logo'
            width={200}
            height={50}
          />
        </aside>
        <div className='flex-1 text-center text-2xl'>
          {"Want to learn more ? Let's talk."}
        </div>
        <nav className='flex-0 justify-end'>
          <div className='grid grid-flow-col gap-4'>
            <a
              target='_blank'
              rel='noopener'
              href='https://www.instagram.com/resolutio_art/'
              title='Resolutio Instagram'
            >
              <Image
                src='/instagram.svg'
                alt='instagram logo'
                width={26}
                height={10}
              />
            </a>
            <a
              target='_blank'
              rel='noopener'
              href='https://discord.gg/24my5DbuS9'
              title='Resolutio Discord'
            >
              <Image
                src='/discord.svg'
                alt='discord logo'
                width={26}
                height={10}
              />
            </a>
            <a
              target='_blank'
              rel='noopener'
              href='https://twitter.com/resolutio_art'
              title='Resolutio Twitter'
            >
              <Image
                src='/twitter.svg'
                alt='twitter logo'
                width={24}
                height={24}
              />
            </a>
            <a
              target='_blank'
              rel='noopener'
              href='https://www.linkedin.com/company/dec-resolutio/'
              title='Resolutio Linkedin'
            >
              <Image
                src='/linkedin.svg'
                alt='linkedin Logo'
                width={24}
                height={28}
              />
            </a>
            <a
              target='_blank'
              rel='noopener'
              href='mailto:resolutio.zs@gmail.com'
              title='Resolutio Mail'
            >
              <Image src='/email.svg' alt='mail logo' width={26} height={28} />
            </a>
          </div>
        </nav>
      </div>

      <aside className='flex w-full flex-row justify-center'>
        <p className='justify-center text-center'>
          resolutio © Copyright {new Date().getFullYear()}. All Rights
          Reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
