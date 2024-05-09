import { monalisaart } from '@/app/assets';
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
      <Evidenceform />
      <div className='p-5'>
        <SideImage
          imageURL={monalisaart}
          imgNavigation={author.profileLink}
          author={author}
          showAuthor
          imgClassName=''
        />
      </div>
    </div>
  );
};

export default Evidence;
