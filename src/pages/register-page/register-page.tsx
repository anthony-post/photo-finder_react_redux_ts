import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { AuthForm } from '../../components/auth-form/auth-form';
import s from './register-page.module.css';

export const RegisterPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const handleRegister = (userCredentials: {
    email: string;
    password: string;
  }) => {
    setError('');
    setIsLoading(true);

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      // здесь не нужен dispatch, так как используется firebase observer - onAuthStateChanged,
      // который делает dispatch в случае, если пользователь зарегистрировался
      .then(() => {
        navigate(fromPage, { replace: true });
      })
      .catch(error => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return (
    <div className={s.register}>
      <h2>Register</h2>
      <p>You have come from the page - {fromPage}</p>
      <AuthForm
        titleBtn={'Register'}
        handleClick={userCredentials => handleRegister(userCredentials)}
        errorForm={error}
        isLoading={isLoading}
      />
      <div className={s['helper-text']}>
        <span>Already have an account? </span>
        <Link
          to="/login"
          state={{
            from: {
              pathname: fromPage
            }
          }}
          className={s['login-link']}
        >
          Login
        </Link>
      </div>
    </div>
  );
};
