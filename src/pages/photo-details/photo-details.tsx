import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetPhotoByIdQuery } from '../../features/unsplash-api/unsplash-api';
import { useAuth } from '../../hooks/auth-hook';
import {
  addFavourites,
  getUserDbProfile,
  removeFavourites
} from '../../app/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import s from './photo-details.module.css';

export const PhotoDetails = () => {
  const location = useLocation();
  const params = useParams<{ photoId: string }>();
  const navigate = useNavigate();
  const { isAuth, userId, userEmail } = useAuth();
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.users.favourites.data);

  const { data, isLoading, isUninitialized, isError } = useGetPhotoByIdQuery(
    params.photoId
  );

  const goBack = () => navigate(-1);

  const isFavourite = () => {
    if (data) {
      return favourites.includes(data.id);
    }
  };

  const updateFavourites = async (dataEmail: string | null | undefined) => {
    if (isAuth) {
      if (isFavourite()) {
        await dispatch(
          removeFavourites({ userEmail: dataEmail, photoId: data?.id })
        );
      } else {
        await dispatch(
          addFavourites({
            userEmail: dataEmail,
            photoId: data?.id
          })
        );
      }
      // синхронизирует firebase и store
      dispatch(
        getUserDbProfile({
          userId: userId,
          userEmail: dataEmail
        })
      );
    } else {
      navigate('/login', {
        state: {
          from: {
            pathname: location.pathname
          }
        }
      });
    }
  };

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
    <section>
      <Button onClick={goBack}>Назад</Button>
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
          <Button
            variant="contained"
            size="large"
            endIcon={isFavourite() ? <StarIcon /> : <StarBorderIcon />}
            onClick={() => updateFavourites(userEmail)}
          >
            Добавить/Удалить
          </Button>
        </div>
      </article>
    </section>
  );
};
