// export type FeedItemDto = {
//   id: number;
//   creator: {
//     name: string;
//     image: string;
//   };
//   work: {
//     type: string;
//     url: string;
//     description: string;
//   };
//   createdOn: string;
//   views: number;
//   licenses: number;
//   code: string;
// };

export interface FeedItemDto {
  userId:                string;
  nameOfWork:            string;
  medium:                string;
  timeStamp:             Date;
  licenseType:           string;
  cid:                   string;
  fileUploadResponse:    EUploadResponse;
  licenseUploadResponse: EUploadResponse;
  createdAt:             Date;
  updatedAt:             Date;
}

export interface EUploadResponse {
  hash: string;
  name: string;
  size: string;
  _id:  string;
}
