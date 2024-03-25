import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';
import s from './image-list-layout.module.css';
import type { Photo } from '../../features/unsplash-api/shape-photo';

type Props = {
  data: Photo[];
};

export const ImageListLayout = (props: Props) => {
  return (
    <ImageList variant="woven" cols={3} gap={8}>
      {props.data.map(item => (
        <Link className={s['photo-item__wrp']} key={item.id} to={`/${item.id}`}>
          <ImageListItem key={item.id}>
            <img
              srcSet={item.url}
              src={item.url}
              alt={item.altDescription}
              className={s['photo-item__img']}
              loading="lazy"
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};
