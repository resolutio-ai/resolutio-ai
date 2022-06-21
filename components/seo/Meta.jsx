import Head from "next/head";

const Meta = ({
  title,
  keywords,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
}) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta charSet="utf-8"></meta>
      <title>{title}</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};
Meta.defaultProps = {
  title: "resolutio",
  keywords:
    "nft, resolutio, resolutio nft, resolutio token, resolutio token nft",
  description: "",
  ogTitle: "resolutio",
};
export default Meta;
