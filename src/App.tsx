import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import SearchForm from './components/SearchForm/SearchForm';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieTile from './components/MovieTile/MovieTile';
import MovieDetails from './components/MovieDetails/MovieDetails';
import SortControl from './components/SortControl/SortControl';
import MovieModal from './components/MovieForm/MovieModal';

import { Genres, IMovieDetails } from './types';
import movies from './movies.json';
import './assets/styles/vars.css';
import './assets/styles/typography.css';
import './app.scss';
import logo from './assets/images/logo.svg';

function App() {
  // Genres select
  const genres = Object.values(Genres);
  const [activeGenre, setActiveGenre] = useState(Genres.All);

  // Movies Select
  const [activeMovie, setActiveMovie] = useState<IMovieDetails | null>(null);
  const goToActiveMovie = (name: string) => {
    const activeMovie = movies.find((movie) => movie.name === name);
    setActiveMovie(activeMovie as IMovieDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container container">
          <a href="/">
            <img src={logo} alt="App" />
          </a>
          <button className="add-btn" onClick={open}>
            + add movie
          </button>
        </div>
      </header>
      {activeMovie ? (
        <MovieDetails movie={activeMovie as IMovieDetails} />
      ) : (
        <div className="hero">
          <div className="hero__inner">
            <h1 className="hero-title">Find your movie</h1>
            <SearchForm
              initialValue="Search..."
              onSearch={(term) => console.log(term)}
            />
          </div>
        </div>
      )}
      <div className="container">
        <div className="app__filters">
          <GenreSelect
            onSelect={(genre) => setActiveGenre(genre)}
            genres={genres}
            activeGenre={activeGenre}
          />
          <SortControl />
        </div>
        <div className="app__results">39 movies found</div>
        <div className="app__cards">
          {movies.map((movie) => (
            <MovieTile
              key={movie.name}
              movie={movie}
              onMovieClick={() => goToActiveMovie(movie.name)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen && <MovieModal handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
