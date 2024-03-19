import './App.css';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { HomePage } from './pages/home-page/home-page';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
};
