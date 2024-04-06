import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { setUser } from '../../app/slices/usersSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ContentSection } from '../../components/content-section/content-section';
import { auth } from '../../firebase/config';
import s from './main-layout.module.css';

export const MainLayout = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const dispatch = useAppDispatch();
  // onAuthStateChanged нужен для того, чтобы, если пользователь скопирует ссылку и откроет в новой вкладке,
  // то firebase будет знать, что пользователь уже залогинился и поэтому мы в store снова записываем данные о текущем пользователе
  // Set an authentication state observer and get user data
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // set user to store
        dispatch(
          setUser({
            id: user.uid,
            email: user.email
          })
        );
      } else {
        // reset user from store
        dispatch(
          setUser({
            id: '',
            email: ''
          })
        );
      }
      setIsCheckingAuth(true);
    });
  }, [dispatch]);

  return (
    <>
      {!isCheckingAuth ? (
        <div className={s.loader}>
          <CircularProgress color="inherit" disableShrink />
        </div>
      ) : (
        <>
          <Header />
          <ContentSection>
            <Outlet />
          </ContentSection>
          <Footer />
        </>
      )}
    </>
  );
};
