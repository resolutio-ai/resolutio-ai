export type EUploadResponse = {
  hash: string;
  name: string;
  size: string;
  _id: string;
};

export type FeedItemDto = {
  _id: string;
  userId: string;
  nameOfWork: string;
  medium: string;
  timeStamp: Date;
  licenseType: string;
  cid: string;
  fileUploadResponse: EUploadResponse;
  licenseUploadResponse: EUploadResponse;
  createdAt: Date;
  updatedAt: Date;
};
