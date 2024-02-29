"use client"
import { Footer, Header } from '@/app/components';
import type { Metadata } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import { DM_Sans, Montserrat } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// import {
//   arbitrum,
//   base,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
//   zora,
//   filecoin,
//   filecoinCalibration,
//   polygonMumbai
// } from 'wagmi/chains';

import './theme/globals.scss';
import { filecoinCalibration, polygon } from 'viem/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,    
    filecoinCalibration,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [filecoinCalibration] : []),
  ],
  [publicProvider()]
);

const projectId = '93493a43dea69093094d5bf6cdefb600';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});


const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang='en'
      className={`${montserrat.variable} ${dm_sans.variable}`}
      data-theme='resolutioTheme'
    >     
          <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Header />
            <main className='content'>{children}</main>
            <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
          </body>
        
    </html>
  );
};

export default RootLayout;
