import { useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Link,
  useNavigate,
} from 'react-router-dom';

import MovieListPage from './views/MovieListPage';
import PageNotFound from './views/PageNotFound';
import MovieDetails from '@components/MovieDetails';
import AppHero from '@components/AppHero/AppHero';
import { MovieModal } from '@components/modals';

import './assets/styles/vars.css';
import './assets/styles/typography.css';
import './app.scss';
import logo from './assets/images/logo.svg';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate('/');
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container container">
          <Link to="/">
            <img src={logo} alt="App" />
          </Link>
          {!location.pathname.match(/\/\d+/g)! && (
            <Link className="add-btn" to="/new">
              + add movie
            </Link>
          )}
        </div>
      </header>
      <div className="app__main">
        <Routes>
          <Route element={<MovieListPage />}>
            <Route path="/:movieId" element={<MovieDetails />}>
              <Route path="edit" element={<MovieModal handleClose={goHomePage} />} />
            </Route>
            <Route path="/" element={<AppHero />}>
              <Route
                path="/new"
                element={<MovieModal handleClose={goHomePage} />}
              />
            </Route>
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
    </div>
  );
}

export default App;
