import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { unsplashApi } from '../features/unsplash-api/unsplash-api';
import { usersReducer } from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [unsplashApi.reducerPath]: unsplashApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(unsplashApi.middleware)
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<AppStore['getState']>;
