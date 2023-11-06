import { FC } from 'react';

import './AbractLinkWithImage.scss';

interface AbractLinkWithImageProps {
  heading: string;
  description?: string;
  imageURL: string;
  btnText: string;
  link: string;
  isExternal?: boolean;
  imagePosition?: 'left' | 'right';
}

const AbractLinkWithImage: FC<AbractLinkWithImageProps> = ({
  heading,
  description,
  imageURL,
  btnText,
  link,
  isExternal = false,
  imagePosition = 'right',
}) => {
  const imgOrder = imagePosition === 'left' ? 'order-1' : 'order-2';
  const contentOrder = imagePosition === 'left' ? 'order-2' : 'order-1';
  return (
    <div className='link-with-img grid md:grid-cols-2'>
      <div
        className={`content-container flex items-center justify-center ${contentOrder}`}
      >
        <div className='content px-4'>
          <h1 className='font-secondary-heading mb-4'>{heading}</h1>
          {description && <p className='description mb-6'>{description}</p>}
          <button className='btn btn-outline'>{btnText}</button>
        </div>
      </div>
      <div className={`img-container ${imgOrder}`}>
        <img src={imageURL} alt='Img' className='cover-img' />
      </div>
    </div>
  );
};

export default AbractLinkWithImage;
