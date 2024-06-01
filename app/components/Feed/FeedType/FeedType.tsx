import { AiIcon, BrushIcon, MusicIcon, PencilIcon } from '@/app/assets';
import { FC, ReactElement } from 'react';

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

const FeedType: FC<FeedTypeProps> = ({ type }) => {
  return (
    <div className='work-type absolute right-[15px] top-[15px] flex cursor-pointer rounded-md bg-white/25 p-2 backdrop-blur'>
      {FeedTypes[type]}
    </div>
  );
};

export default FeedType;
