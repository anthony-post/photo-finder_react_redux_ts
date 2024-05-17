import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';
// import { History, HistoryBlock } from '../../pages/history-page/history-page';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useAuth } from '../../hooks/auth-hook';
import { addHistory, getUserDbProfile } from '../../app/slices/usersSlice';
import s from './search-form.module.css';

type FormFields = {
  TextField: string;
};

export const SearchForm = () => {
  const navigate = useNavigate();
  const { isAuth, userId, userEmail } = useAuth();
  const dispatch = useAppDispatch();
  // TODO требуется доработка, так как, если расскоментировать использование useSearchParams, то работает некорректно ???
  // Проверяем есть ли в URL параметр запроса для поиска - если ДА, то подставляем это значение в поле Поиска
  // const [searchParams, setSearchParams] = useSearchParams();
  // const searchParamValue = searchParams.get('query');
  const searchInputValue = (inputValue: string): string => {
    // if (searchParamValue) {
    //   return searchParamValue;
    // }
    if (inputValue) {
      return inputValue;
    }
    return '';
  };

  const { handleSubmit, control } = useForm<FormFields>();

  const onSearchFormSubmit: SubmitHandler<FormFields> = async data => {
    // setSearchParams({ query: data.TextField });
    if (isAuth) {
      await dispatch(
        addHistory({
          userEmail: userEmail,
          search: data.TextField
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
    navigate(`/search?query=${data.TextField}`);
  };

  // const [isActive, setIsActive] = useState(false);
  // const toggleHistory = () => {
  //   return isActive ? setIsActive(false) : setIsActive(true);
  // };

  return (
    <form
      className={s['control-search']}
      onSubmit={handleSubmit(onSearchFormSubmit)}
    >
      <Controller
        name="TextField"
        control={control}
        rules={{
          required: true
        }}
        render={({
          field: { onChange, value, ref },
          fieldState: { error }
        }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            // onChange={onChange}
            onChange={e => {
              onChange(e.target.value);
              // showHistory(e);
            }}
            // onFocus={toggleHistory}
            // onBlur={toggleHistory}
            value={searchInputValue(value)}
            fullWidth
            label="Enter keywords"
            variant="filled"
            inputRef={ref}
            autoComplete="off"
          />
        )}
      />
      <Button
        variant="contained"
        size="large"
        endIcon={<SearchIcon />}
        type="submit"
      >
        Search
      </Button>
      {/* {isActive && <HistoryBlock />} */}
      {/* {isActive && <History />} */}
    </form>
  );
};
