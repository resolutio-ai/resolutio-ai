'use client';

import { useMagicLinkContext } from '@/app/contexts';
import { LOGIN_MODAL_ID } from '@/app/settings';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginDialogProps = {};

type LoginFormInput = {
  email: string;
};

const LoginDialog: FC<LoginDialogProps> = () => {
  const { login } = useMagicLinkContext();
  const { register, handleSubmit, reset } = useForm<LoginFormInput>();

  const closeModal = () => {
    const modal = document.getElementById(LOGIN_MODAL_ID) as HTMLDialogElement;
    if (modal) {
      modal.close();
      reset();
    }
  };

  const handleLogin: SubmitHandler<LoginFormInput> = ({ email }) => {
    if (!login) {
      console.log('login function is not defined');
      return;
    }
    closeModal();
    login(email);
  };

  return (
    <dialog id={LOGIN_MODAL_ID} className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn-circle btn-ghost btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <h3 className='text-lg font-bold'>Login!</h3>
        <form className='mt-4' onSubmit={handleSubmit(handleLogin)}>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Enter your email to login</span>
            </div>
            <input
              type='email'
              placeholder='johndoe@example.com'
              className='input input-bordered w-full'
              {...register('email', { required: true })}
            />
          </label>
          <div className='flex flex-row-reverse'>
            <button className='btn-primary btn mt-4' type='submit'>
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginDialog;
