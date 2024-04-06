import { useAppSelector } from './redux-hooks';

export const useAuth = () => {
  const { id, email } = useAppSelector(state => state.users.currentUser);

  return {
    isAuth: !!id,
    email: email
  };
};
