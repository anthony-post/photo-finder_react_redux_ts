import { Link } from 'react-router-dom';
import { SearchForm } from '../search-form/search-form';
import s from './header.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <Link className={s['header-logo']} to="/">
        PhotoFinder
      </Link>
      <SearchForm />
      <div className={s.account}>Guest</div>
    </header>
  );
};
