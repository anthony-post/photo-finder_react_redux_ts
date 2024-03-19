import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

import { router } from './app/router';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};
