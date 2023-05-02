import { useState } from 'react';
import { Route, Routes, useParams, useLocation, Link } from 'react-router-dom';

import MovieListPage from './views/MovieListPage';
import PageNotFound from './views/PageNotFound';
import MovieDetails from '@components/MovieDetails';
import AppHero from '@components/AppHero/AppHero';
import { MovieModal } from '@components/modals';
import { useModal } from './hooks/useModal';

import './assets/styles/vars.css';
import './assets/styles/typography.css';
import './app.scss';
import logo from './assets/images/logo.svg';

function App() {
  const location = useLocation();

  // Modal
  const { modalOpen, open, close } = useModal();

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container container">
          <Link to="/">
            <img src={logo} alt="App" />
          </Link>
          {!location.pathname.match(/\/\d+/g)! && (
            <button className="add-btn" onClick={open}>
              + add movie
            </button>
          )}
        </div>
      </header>
      <div className="app__main">
        <Routes>
          <Route path="/" element={<MovieListPage />}>
            <Route path="/:movieId" element={<MovieDetails />} />
            <Route index element={<AppHero />} />
          </Route>
          <Route path="/not-found" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <footer className="app__footer">
        <div className="app__footer-container container">
          <a href="/">
            <img src={logo} alt="App" />
          </a>
        </div>
      </footer>
      {modalOpen && <MovieModal handleClose={close} />}
    </div>
  );
}

export default App;
