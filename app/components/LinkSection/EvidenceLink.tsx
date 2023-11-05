import { FC } from 'react';
import { AbstractLinkSection } from './AbstractLinkSection';

const EvidenceLink: FC = () => {
  return (
    <AbstractLinkSection
      heading='Protect what you create'
      description='You want to protect all those great ideas you have? We want you to create them, lots of them, with no worries while we work on protecting your works.'
      link='#'
      btnText='Evidence Form'
    />
  );
};

export default EvidenceLink;
