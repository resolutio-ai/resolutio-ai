import {
  BLOGS_FILE,
  CMS_BASE_URL,
  LINK_FOLDER,
  LINK_WITH_IMAGE_FOLDER,
  TEAM_FILE
} from '@/app/settings';
import { FeedItemDto } from '@/app/types';
import axios from 'axios';

// NOTE: Fetch is used when the request is SSR other wise axios is used.

export const getBlogs = (): Promise<Response> => {
  return fetch(`${CMS_BASE_URL}/${BLOGS_FILE}`, { cache: 'no-store' });
};
export const getOurTeam = (): Promise<Response> => {
  return fetch(`${CMS_BASE_URL}/${TEAM_FILE}`, { cache: 'no-store' });
};

export const getLinkSection = (sectionFile: string): Promise<Response> => {
  return fetch(`${CMS_BASE_URL}/${LINK_FOLDER}/${sectionFile}`, {
    cache: 'no-store'
  });
};

export const getSectionWithImage = (sectionFile: string): Promise<Response> => {
  return fetch(`${CMS_BASE_URL}/${LINK_WITH_IMAGE_FOLDER}/${sectionFile}`, {
    cache: 'no-store'
  });
};

export const getFeeds = () => {
  return axios.get<FeedItemDto[]>(`${CMS_BASE_URL}/feedsMock.json`);
};
