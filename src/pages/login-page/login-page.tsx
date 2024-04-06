import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { AuthForm } from '../../components/auth-form/auth-form';
import s from './login-page.module.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const handleLogin = (userCredentials: {
    email: string;
    password: string;
  }) => {
    setError('');
    setIsLoading(true);

    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      // здесь не нужен dispatch, так как используется firebase observer - onAuthStateChanged,
      // который делает dispatch в случае, если пользователь залогинился
      .then(() => {
        navigate(fromPage, { replace: true });
      })
      .catch(error => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={s.login}>
      <h2>Login</h2>
      <p>You have come from the page - {fromPage}</p>
      <AuthForm
        titleBtn={'Login'}
        handleClick={userCredentials => handleLogin(userCredentials)}
        errorForm={error}
        isLoading={isLoading}
      />
      <div className={s['helper-text']}>
        <span>If you do not have an account, please, </span>
        <Link
          to="/register"
          state={{
            from: {
              pathname: fromPage
            }
          }}
          className={s['register-link']}
        >
          Register
        </Link>
      </div>
    </div>
  );
};
