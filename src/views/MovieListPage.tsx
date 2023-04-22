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
import styles from './styles.module.scss';

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
      const searchQuery = query.search ? '&search=' + query.search : '';
      const filterQuery = query.filter ? '&filter=' + query.filter : '';
      const queryUrl = `?limit=24&searchBy=title&sortOrder=asc&sortBy=${query.sortBy}${searchQuery}${filterQuery}`;
      try {
        const result = await fetch(`http://localhost:4000/movies${queryUrl}`);
        const { data } = await result.json();
        setMoviesList(data);
      } catch (err) {
        setMoviesList([]);
      }
    };
    setIsLoading(true);
    fetchData();
    setTimeout(() => setIsLoading(false), 200);
  }, [query]);

  // Genres filtering
  const genres = Object.values(Genres);
  const [activeGenre, setActiveGenre] = useState(Genres.All);

  const setActiveGenreQuery = (genre: Genres) => {
    setActiveGenre(genre);
    setQuery({ ...query, filter: genre === 'All' ? '' : genre });
  };

  // Sorting
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
    <>
      {activeMovie ? (
        <MovieDetails
          movie={activeMovie as IMovieDetails}
          handleClose={closeMovieDetails}
        />
      ) : (
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className="hero-title">Find your movie</h1>
            <SearchForm
              initialValue={query.search}
              onSearch={(term) => setQuery({ ...query, search: term })}
            />
          </div>
        </div>
      )}
      <div className={styles.movies}>
        <div className="container">
          <div className={styles.moviesFilters}>
            <GenreSelect
              onSelect={setActiveGenreQuery}
              genres={genres}
              activeGenre={activeGenre}
            />
            <SortControl onSelected={setActiveFilterQuery} />
          </div>
          <div className={styles.moviesResults} data-cy="movies-amount">
            {moviesList.length ? (
              `${moviesList.length} movies found`
            ) : (
              <div className={styles.moviesEmpty}>
                <div className="hero-title" data-cy="empty-title">
                  No movies found
                </div>
              </div>
            )}
          </div>
          <div className={styles.moviesCards}>
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
    </>
  );
};

export default MovieListPage;
