import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/home-page/home-page';
import { PhotoDetails } from '../pages/photo-details/photo-details';
import { SearchPage } from '../pages/search-page/search-page';
import { LoginPage } from '../pages/login-page/login-page';
import { RegisterPage } from '../pages/register-page/register-page';
import { Favourites } from '../pages/favourites-page/favourites-page';
import { History } from '../pages/history-page/history-page';
import { PrivateRoute } from '../hoc/private-route';

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
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: 'favourites',
        element: (
          <PrivateRoute>
            <Favourites />
          </PrivateRoute>
        )
      },
      {
        path: 'history',
        element: (
          <PrivateRoute>
            <History />
          </PrivateRoute>
        )
      }
    ]
  }
]);
