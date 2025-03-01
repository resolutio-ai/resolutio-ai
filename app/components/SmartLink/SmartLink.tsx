import Link from 'next/link';
import { PropsWithChildren } from 'react';

type SmartLinkProps = {
  href: string;
  isExternal: boolean;
  className?: string;
} & PropsWithChildren;

const SmartLink = ({
  href,
  isExternal,
  children,
  className = ''
}: SmartLinkProps) => {
  if (isExternal) {
    return (
      <a href={href} target='_blank' rel='noreferrer' className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} passHref className={className}>
      {children}
    </Link>
  );
};

export default SmartLink;
