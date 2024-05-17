import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeHistory, getUserDbProfile } from '../../app/slices/usersSlice';
import { useAuth } from '../../hooks/auth-hook';
import s from './history-page.module.css';

// TODO History page

export const History = () => {
  const { data, status } = useAppSelector(state => state.users.history);
  const { isLoading, isError } = useAppSelector(
    state => state.users.userDbProfileLoadingStatus
  );
  // const history = useAppSelector(state => state.users.history);
  const { isAuth, userId, userEmail } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const removeItemFromHistory = async (item: string) => {
    if (isAuth) {
      await dispatch(
        removeHistory({
          userEmail: userEmail,
          search: item
        })
      );
      // синхронизирует firebase и store
      dispatch(
        getUserDbProfile({
          userId: userId,
          userEmail: userEmail
        })
      );
    }
  };

  const handleSearch = (item: string) => {
    navigate(`/search?query=${item}`);
  };

  return (
    <section>
      <h2 className={s['history-title']}>History page</h2>
      {data.length ? (
        <List>
          {data.map((item: string) => (
            <ListItem
              key={item}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeItemFromHistory(item)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar className={s['history-link']}>
                <Avatar>
                  {/* <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleSearch(item)}
                  >
                    <SearchIcon />
                  </IconButton> */}
                  <SearchIcon onClick={() => handleSearch(item)} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div>There are no yet favourites</div>
      )}
    </section>
  );
};

// export const HistoryBlock = props => {
//   const history = useAppSelector(state => state.users.history);

//   if (history.length > 0) {
//     return (
//       <ul className={s['history']}>
//         {history.map(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     );
//   }
// };
