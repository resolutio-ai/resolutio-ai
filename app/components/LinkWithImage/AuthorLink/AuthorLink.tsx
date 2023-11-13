import { FC } from 'react';

import './AuthorLink.scss';

export interface Author {
  name: string;
  artName?: string;
  profileLink?: string;
}

interface AuthorLinkProps {
  author: Author;
}

const AuthorLink: FC<AuthorLinkProps> = ({ author }) => {
  const { name, artName } = author;
  return (
    <div className='author-link absolute bottom-4 right-4 rounded border p-2 text-sm text-white'>
      <span>{`${artName} by ${name}`}</span>
    </div>
  );
};

export default AuthorLink;
