import Link from "next/link";

const SmartLink = ({ isExternal, children, href, style }) => {
  const styles = {
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.75,
    ...style,
  };
  return isExternal ? (
    <a href={href} target="_blank" rel="noreferrer" style={styles}>
      {children}
    </a>
  ) : (
    <Link href={href} passHref>
      <a style={styles}>{children}</a>
    </Link>
  );
};

export default SmartLink;
