import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import s from './search-form.module.css';

type FormFields = {
  TextField: string;
};

export const SearchForm = () => {
  const navigate = useNavigate();
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

  const onSearchFormSubmit: SubmitHandler<FormFields> = data => {
    // setSearchParams({ query: data.TextField });
    navigate(`/search?query=${data.TextField}`);
  };

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
            onChange={onChange}
            value={searchInputValue(value)}
            fullWidth
            label="Enter keywords"
            variant="filled"
            inputRef={ref}
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
    </form>
  );
};
