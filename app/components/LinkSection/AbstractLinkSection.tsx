import { FC } from 'react';
import { SmartLink } from '..';
import ButtonDecoration from './ButtonDecoration';

import { getLinkSection } from '@/app/services/cms.service';
import './AbstractLinkSection.scss';

interface LinkSection {
  heading: string;
  description: string;
  btnText: string;
  link: string;
  isExternal: boolean;
}

interface AbstractLinkSectionProps {
  sectionFile: string;
}

export const AbstractLinkSection: FC<AbstractLinkSectionProps> = async ({
  sectionFile,
}) => {
  let linkSection: LinkSection | null = null;

  try {
    const response: Response = await getLinkSection(sectionFile);
    linkSection = await response.json();
  } catch (error) {
    console.log(error);
  }

  // If section is null, return null
  if (!linkSection) return null;

  const { heading, description, btnText, link, isExternal } = linkSection;

  return (
    <div className='abstract-link-section py-16'>
      <div className='res-container'>
        <h1 className='font-primary-heading mb-4'>{heading}</h1>
        <p>{description}</p>
        <div className='relative mt-14'>
          <SmartLink
            isExternal={isExternal}
            href={link}
            className='btn-secondary btn w-48'
          >
            {btnText}
          </SmartLink>
          <ButtonDecoration />
        </div>
      </div>
    </div>
  );
};
