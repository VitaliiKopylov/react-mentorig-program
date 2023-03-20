import React, { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

const GenreSelect = () => {
  const [activeGenre, setActiveGenre] = useState(genres[0]);

  const onSelect = (genre: string) => {
    setActiveGenre(genre);
  };

  return (
    <div className={styles['genres-filters']}>
      {genres.map((genre) => {
        return (
          <div
            key={genre}
            className={clsx(
              styles['genres-filters-item'],
              activeGenre === genre && styles['genres-filters-item-active'],
            )}
          >
            <button
              className={styles['genres-filters-btn']}
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
