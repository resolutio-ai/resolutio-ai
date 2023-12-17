'use client';

import { useRouter } from 'next/navigation';
import Message from '../../../components/Feed/message';
import { FC } from 'react';

const Page:FC = () => {
  const router = useRouter();

  return (
    <div>
      <Message/>
    </div>
  );
}

export default Page