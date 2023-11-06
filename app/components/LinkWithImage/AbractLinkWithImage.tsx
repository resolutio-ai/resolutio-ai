import { FC } from 'react';

import './AbractLinkWithImage.scss';

interface AbractLinkWithImageProps {
  heading: string;
  description?: string;
  imageURL: string;
  btnText: string;
  link: string;
  isExternal?: boolean;
}

const AbractLinkWithImage: FC<AbractLinkWithImageProps> = ({
  heading,
  description,
  imageURL,
  btnText,
  link,
  isExternal = false,
}) => {
  return (
    <div className='link-with-img grid md:grid-cols-2'>
      <div className='content-container flex items-center justify-center'>
        <div className='content px-4'>
          <h1 className='font-secondary-heading'>{heading}</h1>
          {description && <p className='description'>{description}</p>}
          <button className='btn btn-outline'>{btnText}</button>
        </div>
      </div>
      <div className='img-container'>
        <img src={imageURL} alt='Img' className='cover-img' />
      </div>
    </div>
  );
};

export default AbractLinkWithImage;
