import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UnsplashData } from './shape-unsplash-data';
import type { UnsplashDataBySearch } from './shape-unsplash-data-by-search';
import type { Photo } from './shape-photo';
import type { PhotoDetails } from './shape-photo-details';

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
      // TODO вынести в отдельную функцию-модуль
      transformResponse: (response: UnsplashData[]): Photo[] =>
        response.map((photo: UnsplashData) => {
          return {
            id: photo.id,
            description: photo.description || '',
            altDescription: photo.alt_description || '',
            location: photo.location.name || '',
            url: photo.urls.small
          };
        })
    }),
    getPhotoById: build.query<PhotoDetails, string | undefined>({
      query(photoId) {
        return {
          url: `/photos/${photoId}`
        };
      },
      // TODO вынести в отдельную функцию-модуль
      transformResponse: (photo: UnsplashData): PhotoDetails => {
        return {
          id: photo.id,
          description: photo.description || '',
          altDescription: photo.alt_description || '',
          location: photo.location.name || '',
          url: photo.urls.small,
          creator: {
            name: photo.user.name,
            profileName: photo.user.username,
            profileLink: photo.user.links.html,
            country: photo.user.location
          }
        };
      }
    }),
    getPhotoListBySearch: build.query<Photo[], string | null>({
      query(searchValue) {
        return {
          url: '/search/photos',
          params: {
            query: searchValue,
            page: 1,
            per_page: 9
          }
        };
      },
      // TODO вынести в отдельную функцию-модуль
      transformResponse: (response: UnsplashDataBySearch): Photo[] =>
        response.results.map(photo => {
          return {
            id: photo.id,
            description: photo.description || '',
            altDescription: photo.alt_description || '',
            location: photo.location?.name || '',
            url: photo.urls.small
          };
        })
    })
  })
});

export const {
  useGetPhotoRandomListQuery,
  useGetPhotoByIdQuery,
  useGetPhotoListBySearchQuery
} = unsplashApi;
