import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { useGetPhotoByIdQuery } from '../../features/unsplash-api/unsplash-api';
import s from './photo-details.module.css';

export const PhotoDetails = () => {
  const params = useParams<{ photoId: string }>();

  const { data, isLoading, isUninitialized, isError } = useGetPhotoByIdQuery(
    params.photoId
  );

  if (isLoading || isUninitialized) {
    // TODO component Loader
    return <p>loading ... please wait</p>;
  }

  if (isError) {
    // TODO component ErrorFetch
    return <p>there is some error</p>;
  }

  return (
    <section>
      <Link className={s.breadcrumbs} to="..">
        Назад
      </Link>
      <article className={s['photo-details-wrp']}>
        <img src={data.url} alt={data.altDescription} />
        <div>
          <dl className={s['photo-details__description']}>
            <div>
              <dt className={s['photo-details__title']}>Id</dt>
              <dd className={s['photo-details__text']}>{data.id}</dd>
            </div>
            <div>
              <dt className={s['photo-details__title']}>Location</dt>
              <dd className={s['photo-details__text']}>{data.location}</dd>
            </div>
            <div>
              <dt className={s['photo-details__title']}>Description</dt>
              <dd className={s['photo-details__text']}>
                {data.altDescription}
              </dd>
            </div>
          </dl>
          {/* TODO - На странице должна быть кнопка Добавления/Удаления из
          Избранного. Это тоже забывают делать. Обратите внимание. При клике на
          неё Гостем, перебрасывайте на страницу Входа. Или показывайте
          всплывашку с текстом в духе “Функционал доступен для авторизованного
          пользователя”. - Если перезагрузить эту страницу, то ничего слететь не
          должно. - Если скопировать урл этой страницы, вставить в новую вкладку
          и нажать ентер, то страница также должна корректно открыться. Тоже
          забывают про это при сдаче, а потом приходится доделывать. Обратите
          внимание. */}
          <Button variant="contained" size="large" endIcon={<StarIcon />}>
            Добавить/Удалить Избранное
          </Button>
        </div>
      </article>
    </section>
  );
};
