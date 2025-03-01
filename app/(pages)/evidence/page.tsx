import { monalisaart } from '@/app/assets';
import {
  EvidenceForm,
  RenderOnAuthenticated,
  SideImage,
  Unauthorized
} from '@/app/components';
import { EvidenceFormProvider } from '@/app/providers';

const Evidence = () => {
  const author = {
    name: 'Leonardo da Vinci',
    artName: 'Painting',
    profileLink: 'https://www.google.com'
  };

  return (
    <>
      <RenderOnAuthenticated>
        <div className='grid md:grid-cols-2'>
          <EvidenceFormProvider>
            <EvidenceForm />
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
