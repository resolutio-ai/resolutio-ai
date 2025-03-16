import { DisputeRsolutionForm, RenderOnAuthenticated } from '@/app/components';

const DisputeResolutionPage = () => {
  return (
    <RenderOnAuthenticated>
      <div className='flex h-[100%] items-center justify-center bg-[#f6f6f6] p-10'>
        <DisputeRsolutionForm />
      </div>
    </RenderOnAuthenticated>
  );
};

export default DisputeResolutionPage;
