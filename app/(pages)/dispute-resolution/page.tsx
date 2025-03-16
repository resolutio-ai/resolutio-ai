import { DisputeRsolutionForm, RenderOnAuthenticated } from '@/app/components';

const page = () => {
  return (
    <RenderOnAuthenticated>
      <div className='flex h-[100%] items-center justify-center bg-[#f6f6f6] p-10'>
        <DisputeRsolutionForm />
      </div>
    </RenderOnAuthenticated>
  );
};

export default page;
