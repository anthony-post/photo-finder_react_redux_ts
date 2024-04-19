import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import s from './auth-form.module.css';

type FormFields = {
  email: string;
  password: string;
};

type Props = {
  titleBtn: string;
  errorForm: string;
  handleClick: SubmitHandler<FormFields>;
  isLoading: boolean;
};

export const AuthForm = ({
  titleBtn,
  errorForm,
  handleClick,
  isLoading
}: Props) => {
  const inputValue = (value: string) => {
    if (value) {
      return value;
    } else {
      return '';
    }
  };

  const { handleSubmit, control } = useForm<FormFields>();

  return (
    <form className={s['auth-form']} onSubmit={handleSubmit(handleClick)}>
      <div className={s['auth-form-wrp']}>
        <Controller
          name="email"
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
              value={inputValue(value)}
              fullWidth
              label="Enter your e-mail"
              variant="filled"
              inputRef={ref}
            />
          )}
        />
        <Controller
          name="password"
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
              value={inputValue(value)}
              fullWidth
              label="Enter your password"
              variant="filled"
              inputRef={ref}
              type="password"
            />
          )}
        />
        {/* показывает ошибку от Firebase */}
        {/* TODO сделать словарь с ошибками и отображать пользователю ошибки в понятной форме */}
        {errorForm && <div className={s['auth-form-error']}>{errorForm}</div>}
      </div>

      <Button variant="contained" size="large" type="submit">
        {isLoading ? <CircularProgress color="inherit" /> : titleBtn}
      </Button>
    </form>
  );
};
