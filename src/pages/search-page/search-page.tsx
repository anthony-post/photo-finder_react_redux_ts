import { useSearchParams } from 'react-router-dom';
import { useGetPhotoListBySearchQuery } from '../../features/unsplash-api/unsplash-api';
import { ImageListLayout } from '../../components/image-list/image-list-layout';
import s from './search-page.module.css';

export const SearchPage = () => {
  // Забираем инфу из Урлы и ищем через АПИ данные
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('query');

  const { data, isLoading, isUninitialized, isError } =
    useGetPhotoListBySearchQuery(searchValue);

  if (isLoading || isUninitialized) {
    // TODO component Loader
    return <p>loading ... please wait</p>;
  }

  if (isError) {
    // TODO component ErrorFetch
    return <p>there is some error</p>;
  }
  return (
    <section className={s.search}>
      <h1 className={s['search-title']}>
        Search Page - Photo by search {searchValue}
      </h1>
      <ImageListLayout data={data} />
    </section>
  );
};
