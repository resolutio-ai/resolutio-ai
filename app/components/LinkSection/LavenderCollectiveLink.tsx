import { LAVENDER_LINK_FILE } from '@/app/settings';
import { FC } from 'react';
import { AbstractLinkSection } from './AbstractLinkSection';

const LavenderCollectiveLink: FC = () => {
  return <AbstractLinkSection sectionFile={LAVENDER_LINK_FILE} />;
};

export default LavenderCollectiveLink;
