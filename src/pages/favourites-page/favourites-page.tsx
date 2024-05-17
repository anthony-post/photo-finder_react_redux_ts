import ImageList from '@mui/material/ImageList';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks/redux-hooks';
import { FavouriteItem } from '../../components/favourite-item/favourite-item';
import s from './favourites-page.module.css';

export const Favourites = () => {
  const { data, status } = useAppSelector(state => state.users.favourites);
  const { isLoading, isError } = useAppSelector(
    state => state.users.userDbProfileLoadingStatus
  );
  // const favourites = useAppSelector(state => state.users.favourites);

  if (isLoading) {
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
    <section>
      <h2 className={s['favourites-title']}>Favourites page</h2>
      {data.length ? (
        <ImageList variant="woven" cols={3} gap={8}>
          {data.map(item => (
            <FavouriteItem key={item} item={item} />
          ))}
        </ImageList>
      ) : (
        <div>There are no yet favourites</div>
      )}
    </section>
  );
};
