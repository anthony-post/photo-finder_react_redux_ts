import { Photo } from './shape-photo';

export type PhotoDetails = Photo & {
  creator: {
    name: string;
    profileName: string;
    profileLink: string;
    country: string;
  };
};
