'use client';

import { useRouter } from 'next/navigation';

export default function Message() {
  const router = useRouter();

  return (
    <div>
      <div className='mt-4 space-y-4 md:pt-40'>content</div>
    </div>
  );
}
