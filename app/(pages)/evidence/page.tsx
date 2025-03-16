import { EvidenceForm, RenderOnAuthenticated } from '@/app/components';
import { EvidenceFormProvider } from '@/app/providers';

const EvidencePage = () => {
  return (
    <RenderOnAuthenticated>
      <div className='flex h-[100%] items-center justify-center bg-[#f6f6f6] p-10'>
        <EvidenceFormProvider>
          <EvidenceForm />
        </EvidenceFormProvider>
      </div>
    </RenderOnAuthenticated>
  );
};

export default EvidencePage;
