import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'resolutio AI',
    short_name: 'resolutio',
    description: 'Application to empower artist in the digital age.',
    start_url: '/',
    display: 'standalone',
  };
};

export default manifest;
