import {
  PaintbrushSvg,
  musicNoteIconSvg,
  pencilIconSvg,
  starIconSvg,
} from '@/app/assets/icons';
import { creatorArt, creatorArt2 } from '@/app/assets/images';
import { StaticImageData } from 'next/image';

interface Post {
  creator: string;
  creatorImage: StaticImageData;
  art: StaticImageData;
  artdescription: string;
  description: string;
  code: string;
  licence: string;
  href: string;
  id: string;
}

export const Feeds: Post[] = [
  {
    creator: 'creator123',
    creatorImage: creatorArt2,
    art: creatorArt,
    description:
      'My first AI creation! I am happy to post my art from my latest collections!',
    code: 'CC-BY-NC-ND',
    licence: '',
    href: '',
    artdescription: starIconSvg,
    id: '1',
  },
  {
    creator: 'creator123',
    creatorImage: creatorArt2,
    art: creatorArt2,
    description:
      'My first AI creation! I am happy to post my art from my latest collections!',
    code: 'CC-BY-NC-ND',
    licence: '',
    href: '',
    artdescription: pencilIconSvg,
    id: '2',
  },
  {
    creator: 'creator123',
    creatorImage: creatorArt2,
    art: creatorArt,
    description:
      'My first AI creation! I am happy to post my art from my latest collections!',
    code: 'CC-BY-NC-ND',
    licence: '',
    href: '',
    artdescription: musicNoteIconSvg,
    id: '3',
  },
  {
    creator: 'creator123',
    creatorImage: creatorArt2,
    art: creatorArt2,
    description:
      'My first AI creation! I am happy to post my art from my latest collections!',
    code: 'CC-BY-NC-ND',
    licence: '',
    href: '',
    artdescription: PaintbrushSvg,
    id: '4',
  },
];
