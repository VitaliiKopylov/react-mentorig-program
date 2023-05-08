import { AnimatePresence } from 'framer-motion';

import { useEffect, useState } from 'react';
import { useSearchParams, Outlet, useNavigate } from 'react-router-dom';

import GenreSelect from '@components/GenreSelect';
import MovieTile from '@components/MovieTile';
import SortControl from '@components/SortControl';
import { DeleteModal, MovieModal } from '@components/modals';
import { useModal } from 'hooks/useModal';

import { Genres, IMovieDetails, IOption } from '../types';
import { MOVIE_MODAL, DELETE_MODAL, sortingOptions } from '../constants';
import styles from './styles.module.scss';

const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesList, setMoviesList] = useState<IMovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { modalOpen, open, close } = useModal();
  const [activeModal, setActiveModal] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const searchQuery = searchParams.get('search')
        ? '&search=' + searchParams.get('search')
        : '';
      const filterQuery = searchParams.get('filter')
        ? '&filter=' + searchParams.get('filter')
        : '';
      const sortQuery = searchParams.get('sortBy')
        ? '&sortBy=' + searchParams.get('sortBy')
        : 'release_date';
      const queryUrl = `?limit=24&searchBy=title&sortOrder=asc&${sortQuery}${searchQuery}${filterQuery}`;
      try {
        const result = await fetch(`http://localhost:4000/movies${queryUrl}`);
        const { data } = await result.json();
        setMoviesList(data);
        setIsLoading(false);
      } catch (err) {
        setMoviesList([]);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  // Genres filtering
  const genres = Object.values(Genres);
  const [activeGenre, setActiveGenre] = useState(
    searchParams.get('filter') || Genres.All
  );

  const setActiveGenreQuery = (genre: Genres | string) => {
    setActiveGenre(genre);
    searchParams.set('filter', genre === 'All' ? '' : genre);
    setSearchParams(searchParams);
  };

  // Sorting
  const [filterActiveOption, setFilterActiveOption] = useState<IOption>();
  useEffect(() => {
    const activeFilterOptionValue = searchParams.get('sortBy');
    if (activeFilterOptionValue !== sortingOptions[0].value) {
      const activeFilterOption = sortingOptions.find(
        ({ value }) => activeFilterOptionValue === value
      );
      setFilterActiveOption(activeFilterOption as IOption);
    }
  }, []);
  const setActiveFilterQuery = (option: IOption) => {
    searchParams.set('sortBy', option.value);
    setSearchParams(searchParams);
  };

  // Movies Select
  const [activeMovie, setActiveMovie] = useState<IMovieDetails>();
  const goToActiveMovie = (id: string) => {
    navigate({
      pathname: `/${id}`,
      search: searchParams.toString(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const editMovie = (id: string) => {
    navigate({
      pathname: `/${id}/edit`,
      search: searchParams.toString(),
    });
  };
  const deleteMovie = (title: string) => {
    const activeMovie = moviesList.find((movie) => movie.title === title);
    setActiveModal(DELETE_MODAL);
    open();
  };

  // Modal

  return (
    <>
      <Outlet />
      <div className={styles.movies}>
        <div className="container">
          <div className={styles.moviesFilters}>
            <GenreSelect
              onSelect={setActiveGenreQuery}
              genres={genres}
              activeGenre={activeGenre}
            />
            <SortControl
              onSelected={setActiveFilterQuery}
              activeOption={filterActiveOption}
            />
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
                    onMovieClick={() => goToActiveMovie(movie.id as string)}
                    onMovieEdit={() => editMovie(movie.id as string)}
                    onMovieDelete={() => deleteMovie(movie.title)}
                  />
                ))}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen &&
          ((activeModal === MOVIE_MODAL && (
            <MovieModal handleClose={close} formData={activeMovie} />
          )) ||
            (activeModal === DELETE_MODAL && (
              <DeleteModal handleClose={close} />
            )))}
      </AnimatePresence>
    </>
  );
};

export default MovieListPage;
