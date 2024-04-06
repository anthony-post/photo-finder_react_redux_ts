import s from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <a
        href="https://github.com/anthony-post/"
        className={s['footer-text']}
        target="_blank"
        rel="noreferrer"
      >
        Made by @antonwebdev
      </a>
    </footer>
  );
};
