export type Author = {
  name: string;
  artName?: string;
  profileLink?: string;
};

type AuthorLinkProps = {
  author: Author;
};

const AuthorLink = ({ author }: AuthorLinkProps) => {
  const { name, artName } = author;
  return (
    <div className='author-link absolute bottom-4 right-4 rounded-sm border p-2 text-sm text-white'>
      <span>{`${artName} by ${name}`}</span>
    </div>
  );
};

export default AuthorLink;
