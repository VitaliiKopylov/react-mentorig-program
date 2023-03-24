import clsx from 'clsx';
import { useState } from 'react';
import styles from './styles.module.css';

const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

const GenreSelect = () => {
  const [activeGenre, setActiveGenre] = useState(genres[0]);

  const onSelect = (genre: string) => {
    setActiveGenre(genre);
  };

  return (
    <div className={styles.genresFilters}>
      {genres.map((genre) => {
        return (
          <div
            key={genre}
            className={clsx(
              styles.genresFiltersItem,
              activeGenre === genre && styles.genresFiltersItemActive,
            )}
          >
            <button
              className={styles.genresFiltersBtn}
              onClick={(event) => onSelect(genre)}
            >
              {genre}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GenreSelect;
