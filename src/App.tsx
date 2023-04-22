import { useState } from 'react';

import MovieListPage from './views/MovieListPage';

import './assets/styles/vars.css';
import './assets/styles/typography.css';
import './app.scss';
import logo from './assets/images/logo.svg';
import { MovieModal } from '@components/modals';

function App() {
  // Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  // MovieDetailsOpen
  const [movieDetailsOpen, setMovieDetailsOpen] = useState(false);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container container">
          <a href="/">
            <img src={logo} alt="App" />
          </a>
          {!movieDetailsOpen && (
            <button className="add-btn" onClick={open}>
              + add movie
            </button>
          )}
        </div>
      </header>
      <div className="app__main">
        <MovieListPage
          movieDetailsHandler={() => setMovieDetailsOpen(!movieDetailsOpen)}
        />
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
