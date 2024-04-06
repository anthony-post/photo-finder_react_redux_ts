import CircularProgress from '@mui/material/CircularProgress';
import { useGetPhotoRandomListQuery } from '../../features/unsplash-api/unsplash-api';
import { ImageListLayout } from '../../components/image-list/image-list-layout';
import s from './home-page.module.css';

export const HomePage = () => {
  const { data, isLoading, isUninitialized, isError } =
    useGetPhotoRandomListQuery(9);

  if (isLoading || isUninitialized) {
    return (
      <div className={s['loader']}>
        <CircularProgress color="inherit" disableShrink />
      </div>
    );
  }

  if (isError) {
    // TODO component ErrorFetch
    return (
      <div className={s['loader']}>
        <p>There is some error. Try again later.</p>
      </div>
    );
  }

  return (
    <section className={s.home}>
      <h1 className={s['home-title']}>Home Page - Random Photo</h1>
      <ImageListLayout data={data} />
    </section>
  );
};
