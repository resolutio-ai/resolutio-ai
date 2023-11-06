import { FC } from 'react';
import AbractLinkWithImage from './AbractLinkWithImage';

const ResolveDispute: FC = () => {
  return (
    <AbractLinkWithImage
      heading='Resolve your art dispute'
      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris'
      link='#'
      btnText='Resolve'
      imageURL='https://images.unsplash.com/photo-1682687221248-3116ba6ab483?auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    />
  );
};

export default ResolveDispute;