import Sidebar from '../../components/Feed/sectiions/sidebar/sidebar';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mt-8'>
      <div className='feed-header flex gap-2'>
        <div className='md:w-75 bg-white-900 w-1/6 md:inset-y-0 md:flex md:flex-col'>
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
