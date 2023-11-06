import { FC } from 'react';

import './OurTeam.scss';

interface Member {
  id: number;
  name: string;
  linkedinURL: string;
  imageURL: string;
}

interface MemberItemProps {
  member: Member;
}

const MemberItem: FC<MemberItemProps> = ({ member }) => {
  const { name, imageURL } = member;
  return (
    <div className='our-team-member text-center'>
      <div className='mask'>
        <img src={imageURL} alt={name} className='mx-auto mb-4 h-64' />
      </div>
      <h3 className='mb-2 text-xl font-bold'>{name}</h3>
    </div>
  );
};

const OurTeam: FC = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/resolutio-ai/CRM/main/data/ourMembers.json',
    { cache: 'no-store' }
  );
  const ourMembers: Member[] = await response.json();

  /*   const numItemsInLastRow = ourMembers.length % 3;
  const membersInLastRow = numItemsInLastRow
    ? ourMembers.slice(-numItemsInLastRow)
    : [];

  const membersInGrid = ourMembers.slice(
    0,
    ourMembers.length - numItemsInLastRow
  ); */

  return (
    <div className='our-team-container'>
      <div className='container mx-auto px-4 py-16'>
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
