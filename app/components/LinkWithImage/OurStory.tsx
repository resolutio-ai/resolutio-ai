import { OUR_STORY_FILE } from '@/app/settings';
import { FC } from 'react';
import AbractLinkWithImage from './AbractLinkWithImage';

const OurStory: FC = () => {
  return <AbractLinkWithImage sectionFile={OUR_STORY_FILE} />;
};

export default OurStory;
