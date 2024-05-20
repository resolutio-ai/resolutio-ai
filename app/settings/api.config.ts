import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient();

export const CMS_BASE_URL: string = process.env.NEXT_PUBLIC_CMS_BASE_URL ?? '';
export const LIGHTHOUSE_API_KEY: string =
  process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY ?? '';
