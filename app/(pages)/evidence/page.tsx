import monalisaart from '@/app/assets/evidence-sideimg.png';
import { Evidenceform, SideImage } from '@/app/components';
import { FC } from 'react';

const Evidence: FC = () => {
  const author = {
    name: 'Leonardo da Vinci',
    artName: 'Painting',
    profileLink: 'https://www.google.com',
  };

  return (
    <div className='grid md:grid-cols-2'>
      <div className=''>
        <Evidenceform />
      </div>
      <SideImage
        imageURL={monalisaart}
        imgNavigation={author.profileLink}
        author={author}
        showAuthor
      />
    </div>
  );
};

export default Evidence;
