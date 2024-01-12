export type FeedItemDto = {
  id: number;
  creator: {
    name: string;
    image: string;
  };
  work: {
    type: string;
    url: string;
    description: string;
  };
  createdOn: string;
  views: number;
  licenses: number;
  code: string;
};
