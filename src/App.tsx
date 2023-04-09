import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import SearchForm from './components/SearchForm/SearchForm';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieTile from './components/MovieTile/MovieTile';
import MovieDetails from './components/MovieDetails/MovieDetails';
import SortControl from './components/SortControl/SortControl';
import MovieModal from './components/modals/MovieModal';
import DeleteModal from './components/modals/DeleteModal';

import { Genres, IMovieDetails } from './types';
import movies from './movies.json';
import './assets/styles/vars.css';
import './assets/styles/typography.css';
import './app.scss';
import logo from './assets/images/logo.svg';

const modals = {
  MovieModal,
  DeleteModal,
};

function App() {
  // Genres select
  const genres = Object.values(Genres);
  const [activeGenre, setActiveGenre] = useState(Genres.All);

  // Movies Select
  const [activeMovie, setActiveMovie] = useState<IMovieDetails>();
  const goToActiveMovie = (name: string) => {
    const activeMovie = movies.find((movie) => movie.name === name);
    setActiveMovie(activeMovie as IMovieDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const editMovie = (name: string) => {
    const activeMovie = movies.find((movie) => movie.name === name);
    setActiveMovie(activeMovie as IMovieDetails);
    open('MovieModal');
  };
  const deleteMovie = (name: string) => {
    const activeMovie = movies.find((movie) => movie.name === name);
    open('DeleteModal');
  };
  const addMovie = () => {
    setActiveMovie(undefined);
    open('MovieModal');
  }

  // Modal
  const [modalOpen, setModalOpen] = useState<string | boolean>(false);
  const close = () => setModalOpen(false);
  const open = (type: string) => setModalOpen(type);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container container">
          <a href="/">
            <img src={logo} alt="App" />
          </a>
          <button className="add-btn" onClick={addMovie}>
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
              onMovieDelete={() => deleteMovie(movie.name)}
              onMovieEdit={() => editMovie(movie.name)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen &&
          (
            (modalOpen === 'MovieModal' && <MovieModal handleClose={close} formData={activeMovie} />) ||
            (modalOpen === 'DeleteModal' && (<DeleteModal handleClose={close} />))
          )
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
