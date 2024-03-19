import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useGetPhotoRandomListQuery } from '../../features/unsplash-api/unsplash-api';
import s from './home-page.module.css';

export const HomePage = () => {
  const { data, isLoading, isUninitialized, isError } =
    useGetPhotoRandomListQuery(9);

  if (isLoading || isUninitialized) {
    return <p>loading ... please wait</p>;
  }

  if (isError) {
    return <p>there is some error</p>;
  }
  return (
    <main className={s.home}>
      <h1 className={s['home-title']}>Home Page</h1>
      <section className={s['home-section']}>
        <ImageList variant="woven" cols={3} gap={8}>
          {data.map(item => (
            <ImageListItem key={item.id}>
              <img
                srcSet={item.url}
                src={item.url}
                alt={item.alt_description}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </section>
    </main>
  );
};
