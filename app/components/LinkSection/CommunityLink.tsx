import { FC } from 'react';
import { AbstractLinkSection } from './AbstractLinkSection';

const CommunityLink: FC = () => {
  return (
    <AbstractLinkSection
      heading='Earn incentives for protecting your Community'
      description='Become an arbiter, resolve disputes, protect your community. Get incentivized.'
      link='#'
      btnText='Join the waitlist'
    />
  );
};

export default CommunityLink;
