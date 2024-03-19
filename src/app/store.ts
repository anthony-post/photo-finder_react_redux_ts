import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { unsplashApi } from '../features/unsplash-api/unsplash-api';

export const store = configureStore({
  reducer: {
    [unsplashApi.reducerPath]: unsplashApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(unsplashApi.middleware)
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
