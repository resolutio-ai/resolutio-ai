import { EVENTS_WORKSHOPS_FILE } from '@/app/settings';
import { FC } from 'react';
import AbractLinkWithImage from './AbractLinkWithImage';

const EventsAndWorkShop: FC = () => {
  return <AbractLinkWithImage sectionFile={EVENTS_WORKSHOPS_FILE} />;
};

export default EventsAndWorkShop;
