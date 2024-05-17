import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { SearchForm } from '../search-form/search-form';
import { useAuth } from '../../hooks/auth-hook';
import s from './header.module.css';

export const Header = () => {
  const location = useLocation();

  const { isAuth, userEmail } = useAuth();

  const handleLogOut = () => {
    // sign out from firebase
    signOut(auth);
  };

  return (
    <header className={s.header}>
      <Link className={s['header-logo']} to="/">
        PhotoFinder
      </Link>
      <SearchForm />
      <div className={s['header-controls']}>
        {isAuth ? (
          <>
            <div>{userEmail}</div>
            <Link to={'/favourites'} className={s['header-controls__link']}>
              Favourites
            </Link>
            <Link to={'/history'} className={s['header-controls__link']}>
              History
            </Link>
            <div className={s['header-controls__link']} onClick={handleLogOut}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link
              to={'/login'}
              state={{ from: location }}
              className={s['header-controls__link']}
            >
              Login
            </Link>
            <Link
              to={'/register'}
              state={{ from: location }}
              className={s['header-controls__link']}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
