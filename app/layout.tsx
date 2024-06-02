import { Footer, Header } from '@/app/components';
import {
  MagicProvider,
  ReactQueryClientProvider,
  UserProvider
} from '@/app/providers';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { DM_Sans, Montserrat } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { GA_TRACKING_ID } from './settings';

import './theme/globals.scss';

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: 'resolutio',
  description:
    'A club/home for NFT Community(artists, collectors, developers) where the community collectively owns and operates the platform.Resolutio provides the environment for the Community to come together, engage, and uplift themselves, to help each other and protect each other from harm.Resolutio provides the resources and tools, and extends help to the Community so they can promote and protect each other. [resolutio protects, but by helping the community protect themselves]',
  keywords:
    'NFT theft, NFT search, NFT scam, NFT rights, NFT duplication, NFT disputes, Blockchain dispute resolution, Sneha Vijyan, NFT, resolutio, Zareen Reza, Res Ed, Res Educate, Bestin John, Anish Praveen, Ogubuike Alexandra Ozioma',
  alternates: {
    canonical: 'https://resolutio.ai/'
  }
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang='en'
      className={`${montserrat.variable} ${dm_sans.variable}`}
      data-theme='resolutioTheme'
    >
      <ToastContainer />
      <MagicProvider>
        <UserProvider>
          <ReactQueryClientProvider>
            <body>
              <Header />
              <main className='content'>{children}</main>
              <Footer />
            </body>
          </ReactQueryClientProvider>
        </UserProvider>
      </MagicProvider>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </html>
  );
};

export default RootLayout;
