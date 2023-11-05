import { FC } from 'react';

import './AbstractLinkSection.scss';

interface AbstractLinkSectionProps {
  heading: string;
  description: string;
  btnText: string;
  link: string;
  isExternalLink?: boolean;
}

export const AbstractLinkSection: FC<AbstractLinkSectionProps> = ({
  heading,
  description,
  btnText,
  link,
  isExternalLink = false,
}) => {
  return (
    <div className='abstract-link-section'>
      <div className='container mx-auto px-4'>
        <h1 className='font-primary-heading'>{heading}</h1>
        <p>{description}</p>
        <button className='btn btn-outline'>{btnText}</button>
      </div>
    </div>
  );
};
