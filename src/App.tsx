import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ContentSection } from './components/content-section/content-section';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <ContentSection>
        <Outlet />
      </ContentSection>
      <Footer />
    </div>
  );
};
