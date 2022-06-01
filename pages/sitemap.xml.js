//pages/sitemap.xml.js
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

const SiteMap = () => {
  // getServerSideProps will do the heavy lifting
};

export const getServerSideProps = async ({ req, res }) => {
  // An array with your pages.
  const links = [
    { id: 1, url: "/", changefreq: "weekly", priority: 1 },
    { id: 2, url: "/initiate-dispute", changefreq: "weekly", priority: 0.8 },
    { id: 3, url: "/res-ed", changefreq: "weekly", priority: 0.8 },
    { id: 4, url: "/image-verification", changefreq: "weekly", priority: 0.8 },
  ];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  // We generate the XML sitemap with the links data
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  // we send the XML to the browser
  res.end(xmlString);

  return {
    props: {},
  };
};

export default SiteMap;
