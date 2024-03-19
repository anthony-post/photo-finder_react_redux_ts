import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import s from './header.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s['header-logo']}>PhotoFinder</div>
      <div className={s['control-search']}>
        <TextField
          id="search"
          label="Enter keywords"
          variant="filled"
          fullWidth
        />
        <Button variant="contained" size="large" endIcon={<SearchIcon />}>
          Search
        </Button>
      </div>
      <div className={s.account}>Guest</div>
    </header>
  );
};
