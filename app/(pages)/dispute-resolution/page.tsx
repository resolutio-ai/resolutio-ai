import { DisputeResolutionForm, RenderOnAuthenticated } from '@/app/components';

const DisputeResolutionPage = () => {
  return (
    <RenderOnAuthenticated>
      <div className='flex h-[100%] items-center justify-center bg-[#f6f6f6] p-10'>
        <DisputeResolutionForm />
      </div>
    </RenderOnAuthenticated>
  );
};

export default DisputeResolutionPage;
