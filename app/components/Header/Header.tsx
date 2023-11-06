import Image from 'next/image';
import { FC } from 'react';

const Header: FC = () => {
  // return <header className={styles.header}>Header</header>;
  return (
    <>
      <div className="navbar bg-base-100 md:px-10 fixed  top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Feed</a></li>
              <li><a>Resources</a></li>
              <li><a>ResEd</a></li>
              <li><a>Community</a></li>
              <li><a>Login</a></li>

            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl text-primary">
            <Image src="/master_logo.svg" alt="Resolutio" className='hidden lg:flex' width={50} height={50} />
            <Image src="/logo_linear_rectangle.svg" alt="Resolutio" className='lg:hidden' width={150} height={50} />
          </a>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden lg:flex text-primary">
            <li><a>Feed</a></li>
            <li><a>Resources</a></li>
            <li><a>ResEd</a></li>
            <li><a>Community</a></li>
          </ul>
          <a className="btn btn-primary hidden lg:flex">Login</a>
        </div>
      </div>
    </>
  )
};

export default Header;
