import ImageList from '@mui/material/ImageList';
import { useAppSelector } from '../../hooks/redux-hooks';
import { FavouriteItem } from '../../components/favourite-item/favourite-item';
import s from './favourites-page.module.css';

export const Favourites = () => {
  const favourites = useAppSelector(state => state.users.favourites);

  return (
    <section>
      <h2 className={s['favourites-title']}>Favourites page</h2>
      {favourites.length > 0 ? (
        <ImageList variant="woven" cols={3} gap={8}>
          {favourites.map(item => (
            <FavouriteItem key={item} item={item} />
          ))}
        </ImageList>
      ) : (
        <div>There are no yet favourites</div>
      )}
    </section>
  );
};
