import { useLocation, Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks/auth-hook';

export const PrivateRoute = (props: PropsWithChildren) => {
  const location = useLocation();
  // кастомный хук useAuth предоставляет информацию о состоянии авторизации пользователя
  const { isAuth } = useAuth();

  return isAuth ? (
    <>{props.children}</>
  ) : (
    <Navigate to={'/login'} state={{ from: location }} />
  );
};
