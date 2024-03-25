import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/home-page/home-page';
import { PhotoDetails } from '../pages/photo-details/photo-details';
import { SearchPage } from '../pages/search-page/search-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // TODO ErrorPage or ErrorBoundary
    // errorElement: <div>404 Not Found</div>,
    children: [
      // TODO ErrorPage or ErrorBoundary
      // errorElement: <div>404 Not Found</div>,
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/:photoId',
        element: <PhotoDetails />
      },
      {
        path: '/search',
        element: <SearchPage />
      }
    ]
  }
]);
