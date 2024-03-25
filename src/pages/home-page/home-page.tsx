import { useGetPhotoRandomListQuery } from '../../features/unsplash-api/unsplash-api';
import { ImageListLayout } from '../../components/image-list/image-list-layout';
import s from './home-page.module.css';

export const HomePage = () => {
  const { data, isLoading, isUninitialized, isError } =
    useGetPhotoRandomListQuery(9);

  if (isLoading || isUninitialized) {
    // TODO component Loader
    return <p>loading ... please wait</p>;
  }

  if (isError) {
    // TODO component ErrorFetch
    return <p>there is some error</p>;
  }
  return (
    <section className={s.home}>
      <h1 className={s['home-title']}>Home Page - Random Photo</h1>
      <ImageListLayout data={data} />
    </section>
  );
};
