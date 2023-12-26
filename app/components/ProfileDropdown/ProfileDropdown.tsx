'use client';

import { useUserContext } from '@/app/contexts';
import { LOGIN_MODAL_ID } from '@/app/settings';
import { FC, useMemo } from 'react';

type ProfileDropdownProps = {};

const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const { user, logout, isAuthenticated, isLoading } = useUserContext();

  const openLoginModal = () => {
    const modal = document.getElementById(LOGIN_MODAL_ID) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const initails = useMemo(() => user?.email?.charAt(0), [user?.email]);

  if (isLoading) {
    return (
      <div className='skeleton h-8 w-8 shrink-0 rounded-full ring ring-slate-300'></div>
    );
  }
  return (
    <>
      {isAuthenticated ? (
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
              <span>Profile</span>
            </li>
            <li>
              <span onClick={logout}>Logout</span>
            </li>
          </ul>
        </div>
      ) : (
        <button className='btn-primary btn' onClick={openLoginModal}>
          Login
        </button>
      )}
    </>
  );
};

export default ProfileDropdown;
