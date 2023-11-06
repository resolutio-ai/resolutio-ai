import { FC } from 'react';
import AbractLinkWithImage from './AbractLinkWithImage';

const EventsAndWorkShop: FC = () => {
  return (
    <AbractLinkWithImage
      heading='Events & Workshops'
      btnText='See more'
      link='#'
      imageURL='https://images.unsplash.com/photo-1698118415466-803c9f7e8faa?auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      imagePosition='left'
    />
  );
};

export default EventsAndWorkShop;
