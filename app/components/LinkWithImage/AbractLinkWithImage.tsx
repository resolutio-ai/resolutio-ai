import { getSectionWithImage } from '@/app/services/cms.service';
import Image from 'next/image';
import { FC } from 'react';
import { SmartLink } from '..';

import './AbractLinkWithImage.scss';
import AuthorLink, { Author } from './AuthorLink/AuthorLink';

interface AbractLinkWithImageProps {
  sectionFile: string;
}

interface ImageSection {
  heading: string;
  description?: string;
  imageURL: string;
  btnText: string;
  link: string;
  isExternal?: boolean;
  isGIF?: boolean;
  imagePosition?: 'left' | 'right';
  showAuthor: boolean;
  author: Author;
}

const AbractLinkWithImage: FC<AbractLinkWithImageProps> = async ({
  sectionFile,
}) => {
  let section: ImageSection | null = null;

  try {
    const response: Response = await getSectionWithImage(sectionFile);
    section = await response.json();
  } catch (error) {
    console.error(error);
  }

  // If section is null, return null
  if (!section) return null;

  const {
    heading,
    description,
    imageURL,
    btnText,
    link,
    isExternal = false,
    isGIF = false,
    imagePosition,
    showAuthor,
    author,
  } = section;

  const imgOrder = imagePosition === 'left' ? 'order-1' : 'order-2';
  const contentOrder = imagePosition === 'left' ? 'order-2' : 'order-1';
  const imgNavigation = author.profileLink
    ? author.profileLink
    : 'javascript:void(0);';

  return (
    <div className='link-with-img grid md:grid-cols-2'>
      <div
        className={`content-container flex items-center justify-center ${contentOrder}`}
      >
        <div className='content-cta'>
          <h1 className='font-secondary-heading mb-4'>{heading}</h1>
          {description && <p className='description'>{description}</p>}
          <SmartLink
            href={link}
            isExternal={isExternal}
            className='btn-primary btn btn-outline mt-6'
          >
            {btnText}
          </SmartLink>
        </div>
      </div>
      <div className={`img-container relative ${imgOrder}`}>
        <a href={imgNavigation} target='_blank' rel='noreferrer'>
          <Image
            src={imageURL}
            alt='Art'
            className='cover-img h-[calc(100vh-64px)] w-[100%] object-cover'
            width={500}
            height={500}
            unoptimized={isGIF} // Next/image doesn't support GIFs yet so we need to disable optimization
          />
        </a>
        {showAuthor && <AuthorLink author={author} />}
      </div>
    </div>
  );
};

export default AbractLinkWithImage;
