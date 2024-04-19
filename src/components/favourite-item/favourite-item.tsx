import CircularProgress from '@mui/material/CircularProgress';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';
import { useGetPhotoByIdQuery } from '../../features/unsplash-api';
import s from './favourite-item.module.css';

type Props = {
  item: string;
};

export const FavouriteItem = (props: Props) => {
  const { data, isLoading, isUninitialized, isError } = useGetPhotoByIdQuery(
    props.item
  );

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
    <Link className={s['photo-item__wrp']} key={data.id} to={`/${data.id}`}>
      <ImageListItem key={data.id}>
        <img
          srcSet={data.url}
          src={data.url}
          alt={data.altDescription}
          className={s['photo-item__img']}
          loading="lazy"
        />
      </ImageListItem>
    </Link>
  );
};
