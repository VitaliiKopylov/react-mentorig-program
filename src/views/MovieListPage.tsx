import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import SearchForm from '@components/SearchForm';
import GenreSelect from '@components/GenreSelect';
import MovieTile from '@components/MovieTile';
import MovieDetails from '@components/MovieDetails';
import SortControl from '@components/SortControl';
import { DeleteModal, MovieModal } from '@components/modals';

import { Genres, IMovieDetails, IOption } from '../types';
import { MOVIE_MODAL, DELETE_MODAL } from '../constants';

interface IMovieListPage {
  movieDetailsHandler: () => void;
}

const MovieListPage = ({ movieDetailsHandler }: IMovieListPage) => {
  const [moviesList, setMoviesList] = useState<IMovieDetails[]>([]);
  const [query, setQuery] = useState({
    search: '',
    filter: '',
    sortBy: 'release_date',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const queryUrl = `?limit=24&searchBy=title&sortOrder=asc&sortBy=${
        query.sortBy
      }${query.search ? '&search=' + query.search : ''}${
        query.filter ? '&filter=' + query.filter : ''
      }`;

      const result = await fetch(`http://localhost:4000/movies${queryUrl}`);
      const { data } = await result.json();
      setMoviesList(data);
    };
    setIsLoading(true);
    fetchData();
    setTimeout(() => setIsLoading(false), 200);
  }, [query]);

  // Genres select
  const genres = Object.values(Genres);
  const [activeGenre, setActiveGenre] = useState(Genres.All);

  const setActiveGenreQuery = (genre: Genres) => {
    setActiveGenre(genre);
    setQuery({ ...query, filter: genre === 'All' ? '' : genre });
  };

  // Sorting functionality
  const setActiveFilterQuery = (option: IOption) => {
    setQuery({ ...query, sortBy: option.value });
  };

  // Movies Select
  const [activeMovie, setActiveMovie] = useState<IMovieDetails>();
  const goToActiveMovie = (title: string) => {
    const activeMovie = moviesList.find((movie) => movie.title === title);
    setActiveMovie(activeMovie as IMovieDetails);
    movieDetailsHandler();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const editMovie = (title: string) => {
    const activeMovie = moviesList.find((movie) => movie.title === title);
    setActiveMovie(activeMovie as IMovieDetails);
    open('MovieModal');
  };
  const deleteMovie = (title: string) => {
    const activeMovie = moviesList.find((movie) => movie.title === title);
    open(DELETE_MODAL);
  };

  // Modal
  const [modalOpen, setModalOpen] = useState<boolean | string>(false);
  const open = (type: string) => setModalOpen(type);
  const close = () => setModalOpen(false);

  // Close MovieDetails
  const closeMovieDetails = () => {
    setActiveMovie(undefined);
    movieDetailsHandler();
  };

  return (
    <div>
      {activeMovie ? (
        <MovieDetails
          movie={activeMovie as IMovieDetails}
          handleClose={closeMovieDetails}
        />
      ) : (
        <div className="hero">
          <div className="hero__inner">
            <h1 className="hero-title">Find your movie</h1>
            <SearchForm
              initialValue=""
              onSearch={(term) => setQuery({ ...query, search: term })}
            />
          </div>
        </div>
      )}
      <div className="container">
        <div className="app__filters">
          <GenreSelect
            onSelect={setActiveGenreQuery}
            genres={genres}
            activeGenre={activeGenre}
          />
          <SortControl onSelected={setActiveFilterQuery} />
        </div>
        <div className="app__results">
          {moviesList.length
            ? `${moviesList.length} movies found`
            : 'NO movies found'}
        </div>

        <div className="app__cards">
          {isLoading
            ? 'Is loading...'
            : moviesList.map((movie) => (
                <MovieTile
                  key={movie.id}
                  movie={movie}
                  onMovieClick={() => goToActiveMovie(movie.title)}
                  onMovieDelete={() => deleteMovie(movie.title)}
                  onMovieEdit={() => editMovie(movie.title)}
                />
              ))}
        </div>
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen &&
          ((modalOpen === MOVIE_MODAL && (
            <MovieModal handleClose={close} formData={activeMovie} />
          )) ||
            (modalOpen === DELETE_MODAL && (
              <DeleteModal handleClose={close} />
            )))}
      </AnimatePresence>
    </div>
  );
};

export default MovieListPage;
