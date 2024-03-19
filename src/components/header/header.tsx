import s from './header.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s['header-logo']}>PhotoFinder</div>
      <div className={s['control-search']}>
        <input placeholder="enter key word" />
        <button>Search</button>
      </div>
      <div className={s.account}>Guest</div>
    </header>
  );
};
