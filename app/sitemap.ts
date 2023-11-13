import { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: 'https://resolutio.ai/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
];

export default sitemap;
