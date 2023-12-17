import Sidebar from '../components/Feed/sectiions/sidebar/sidebar';
import './layout.scss';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=' pt-20    '>
      <div className=' header__section flex h-full gap-1 lg:gap-2'>
        <div className='  md:w-75 bg-white-900 w-1/6 md:inset-y-0   md:flex  md:flex-col   '>
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
