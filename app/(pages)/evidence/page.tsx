import { monalisaart } from '@/app/assets';
import {
  Evidenceform,
  RenderOnAuthenticated,
  SideImage,
  Unauthorized,
} from '@/app/components';
import { EvidenceFormProvider } from '@/app/providers';
import { FC } from 'react';

const Evidence: FC = () => {
  const author = {
    name: 'Leonardo da Vinci',
    artName: 'Painting',
    profileLink: 'https://www.google.com',
  };

  return (
    <>
      <RenderOnAuthenticated>
        <div className='grid md:grid-cols-2'>
          <EvidenceFormProvider>
            <Evidenceform />
          </EvidenceFormProvider>
          <SideImage
            imageURL={monalisaart}
            imgNavigation={author.profileLink}
            author={author}
            showAuthor
            imgClassName=''
          />
        </div>
      </RenderOnAuthenticated>
      <Unauthorized />
    </>
  );
};

export default Evidence;
