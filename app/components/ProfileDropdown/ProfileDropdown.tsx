'use client';

import { useMagicLinkContext } from '@/app/contexts';
import { LOGIN_MODAL_ID } from '@/app/settings';
import { FC, useMemo } from 'react';

type ProfileDropdownProps = {};

const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { user, logout } = useMagicLinkContext();

  const { isAuthenticated, isLoading, metadata } = user;

  const openLoginModal = () => {
    const modal = document.getElementById(LOGIN_MODAL_ID) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const initails = useMemo(() => metadata?.email?.charAt(0), [metadata?.email]);

  if (isLoading) {
    return <div className='skeleton h-10 w-10 shrink-0 rounded-full'></div>;
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className='dropdown dropdown-end'>
            <div className='avatar placeholder'>
              <div
                className='w-8 rounded-full bg-neutral text-neutral-content ring ring-primary'
                tabIndex={0}
                role='button'
              >
                <span className='text-xl uppercase'>{initails}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content z-[1] mt-1 w-52 rounded border bg-base-100 p-2 shadow'
            >
              <li className='disabled'>
                <a>Profile</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <button className='btn-primary btn' onClick={openLoginModal}>
            Login
          </button>
        </>
      )}
    </>
  );
};

export default ProfileDropdown;
