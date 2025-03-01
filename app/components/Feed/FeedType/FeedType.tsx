import { AiIcon, BrushIcon, MusicIcon, PencilIcon } from '@/app/assets';
import { ReactElement } from 'react';

type FeedTypeProps = {
  type: string;
};

const FeedTypes: Record<string, ReactElement> = {
  ai: <AiIcon />,
  music: <MusicIcon />,
  drawing: <PencilIcon />,
  painting: <BrushIcon />,
  // Optimize: Have general umbrella term
  Photo: <BrushIcon />,
  Art: <BrushIcon />
};

const FeedType = ({ type }: FeedTypeProps) => {
  return (
    <div className='work-type absolute right-[15px] top-[15px] flex cursor-pointer rounded-md bg-white/25 p-2 backdrop-blur-sm'>
      {FeedTypes[type]}
    </div>
  );
};

export default FeedType;
