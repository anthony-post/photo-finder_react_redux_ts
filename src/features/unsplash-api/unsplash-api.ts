import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Photo } from './shape-photo';
import type { UnsplashData } from './shape-unsplash-data';

export const unsplashApi = createApi({
  reducerPath: 'unsplashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    method: 'GET',
    headers: {
      Authorization: import.meta.env.VITE_ACCESS_KEY
    }
  }),
  endpoints: build => ({
    getPhotoRandomList: build.query<Photo[], number>({
      query(limit = 6) {
        return {
          url: '/photos/random',
          params: {
            count: limit
          }
        };
      },
      transformResponse: (response: UnsplashData[]): Photo[] =>
        response.map((photo: UnsplashData) => {
          return {
            id: photo.id,
            width: photo.width,
            height: photo.height,
            description: photo.description || '',
            alt_description: photo.alt_description || '',
            url: photo.urls.small
          };
        })
    })
  })
});

export const { useGetPhotoRandomListQuery } = unsplashApi;
