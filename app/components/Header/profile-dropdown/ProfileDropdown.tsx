'use client';

import { useUserContext } from '@/app/contexts';
import { LOGIN_MODAL_ID } from '@/app/settings';
import { useMemo } from 'react';

export const ProfileDropdown = () => {
  const { user, logout, isAuthenticated, isProfileLoading } = useUserContext();

  const openLoginModal = () => {
    const modal = document.getElementById(LOGIN_MODAL_ID) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const initails = useMemo(() => user?.email?.charAt(0), [user?.email]);

  if (isProfileLoading) {
    return (
      <div className='skeleton h-8 w-8 shrink-0 rounded-full ring-3 ring-slate-300'></div>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <div className='dropdown dropdown-end'>
          <div className='avatar avatar-placeholder'>
            <div
              className='bg-neutral text-neutral-content ring-primary w-8 rounded-full ring-3'
              tabIndex={0}
              role='button'
            >
              <span className='text-xl uppercase'>{initails}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box text-primary z-1 w-50 font-bold shadow-sm'
          >
            <li className='disabled'>
              <button
                className='cursor-not-allowed disabled:opacity-50'
                disabled
              >
                Profile
              </button>
            </li>
            <li>
              <button className='' onClick={logout}>
                Logout
              </button>
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
