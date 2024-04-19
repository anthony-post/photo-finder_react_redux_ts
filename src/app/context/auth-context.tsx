import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase-config';

// TODO удалить
// НЕ используется, так как проверка на авторизацию реализована через кастомный хук useAuth и Redux
type InitialState = {
  currentUser: User | null;
};
export const AuthContext = createContext<InitialState>({ currentUser: null });

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
