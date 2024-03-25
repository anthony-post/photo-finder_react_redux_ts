import { UnsplashData } from './shape-unsplash-data';

export type UnsplashDataBySearch = {
  total: number;
  total_pages: number;
  results: UnsplashData[];
};
