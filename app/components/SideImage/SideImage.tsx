import { AuthorLink } from '@/app/components';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import { Author } from '../LinkWithImage/AuthorLink/AuthorLink';

type SideImageProps = {
  additionalClasses?: string;
  imgNavigation: string;
  imageURL: string | StaticImageData;
  isGIF?: boolean;
  showAuthor?: boolean;
  author: Author;
  imgClassName?: string;
};

const SideImage: FC<SideImageProps> = ({
  additionalClasses = '',
  imgNavigation,
  imageURL,
  isGIF = false,
  showAuthor = false,
  author,
  imgClassName = 'object-cover'
}) => {
  const blurDataURL = typeof imageURL === 'string' ? imageURL : '';

  return (
    <div className={`img-container relative ${additionalClasses}`}>
      <a href={imgNavigation} target='_blank' rel='noreferrer'>
        <Image
          src={imageURL}
          blurDataURL={blurDataURL}
          alt='Art'
          className={`cover-img ${imgClassName} h-[calc(100vh-64px)] w-[100%]`}
          width={500}
          height={500}
          unoptimized={isGIF} // Next/image doesn't support GIFs yet so we need to disable optimization
        />
        {showAuthor && <AuthorLink author={author} />}
      </a>
    </div>
  );
};

export default SideImage;
