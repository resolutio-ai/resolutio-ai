import { EVIDENCE_LINK_FILE } from '@/app/settings';
import { FC } from 'react';
import { AbstractLinkSection } from './AbstractLinkSection';

const EvidenceLink: FC = () => {
  return <AbstractLinkSection sectionFile={EVIDENCE_LINK_FILE} />;
};

export default EvidenceLink;
