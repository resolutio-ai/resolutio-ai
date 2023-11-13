import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import './SmartLink.scss';

interface SmartLinkProps extends PropsWithChildren {
  href: string;
  isExternal: boolean;
  className?: string;
}

const SmartLink: FC<SmartLinkProps> = ({
  href,
  isExternal,
  children,
  className = '',
}) => {
  return isExternal ? (
    <a href={href} target='_blank' rel='noreferrer' className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} passHref className={className}>
      {children}
    </Link>
  );
};

export default SmartLink;
