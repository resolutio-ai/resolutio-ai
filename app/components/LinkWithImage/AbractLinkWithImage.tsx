import { SideImage, SmartLink } from '@/app/components';
import { getSectionWithImage } from '@/app/services';
import { FC } from 'react';
import './AbractLinkWithImage.scss';
import { Author } from './AuthorLink/AuthorLink';

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
      <SideImage
        imageURL={imageURL}
        additionalClasses={imgOrder}
        imgNavigation={imgNavigation}
        showAuthor={showAuthor}
        author={author}
      />
    </div>
  );
};

export default AbractLinkWithImage;
