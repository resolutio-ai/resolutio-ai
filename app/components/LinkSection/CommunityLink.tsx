import { COMMUNITY_LINK_FILE } from '@/app/settings';
import { FC } from 'react';
import { AbstractLinkSection } from './AbstractLinkSection';

const CommunityLink: FC = () => {
  return <AbstractLinkSection sectionFile={COMMUNITY_LINK_FILE} />;
};

export default CommunityLink;
