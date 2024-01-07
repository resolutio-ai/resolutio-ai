import { getOurTeam } from '@/app/services/cms.service';
import Image from 'next/image';
import { FC } from 'react';

import './OurTeam.scss';

interface Member {
  id: number;
  name: string;
  profileLink: string;
  imageURL: string;
  mask: string;
  tags: string[];
}

interface MemberItemProps {
  member: Member;
}

const MemberItem: FC<MemberItemProps> = ({ member }) => {
  const { name, imageURL, mask, profileLink } = member;
  return (
    <div className='our-team-member text-center'>
      <a href={profileLink} target='_blank' rel='noreferrer'>
        <div className='mask' style={{ backgroundColor: mask }}>
          <Image
            src={imageURL}
            alt={`${name}'s picture`}
            className='mx-auto mb-4 max-h-64'
            width={256}
            height={256}
          />
        </div>
        <h3 className='mb-2 text-xl font-bold'>{name}</h3>
      </a>
    </div>
  );
};

const OurTeam: FC = async () => {
  let ourMembers: Member[] = [];
  try {
    const response: Response = await getOurTeam();
    ourMembers = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className='our-team-container'>
      <div className='res-container py-16'>
        <h1 className='font-primary-heading mb-4'>Meet our Team</h1>
        <div className='our-team grid gap-4 py-4 md:grid-cols-3'>
          {ourMembers.map((member) => (
            <MemberItem member={member} key={member.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
