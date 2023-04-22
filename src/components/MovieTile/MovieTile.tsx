import { BsThreeDotsVertical } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import { useState } from 'react';
import BaseDropdown from '@components/BaseDropdown';
import BaseImage from '@components/BaseImage';

import { IMovie, IOption } from '../../types';
import styles from './styles.module.scss';

interface MovieTileProps {
  movie: IMovie;
  onMovieClick: () => void;
  onMovieDelete: () => void;
  onMovieEdit: () => void;
}

const MovieTile = ({
  movie,
  onMovieClick,
  onMovieDelete,
  onMovieEdit,
}: MovieTileProps) => {
  const { poster_path, title, release_date, genres } = movie;
  const [open, setOpen] = useState(false);

  const optionSelected = (option: IOption) => {
    if (option.value === 'delete') onMovieDelete();
    if (option.value === 'edit') onMovieEdit();
    setOpen(false);
  };

  return (
    <div
      className={styles.movieTile}
      onMouseLeave={() => setOpen(false)}
      data-anim="movie-tile"
    >
      <div className={styles.movieTile__top}>
        <BaseImage
          className={styles.movieTile__image}
          src={poster_path}
          alt={title}
          onClick={onMovieClick}
        />
        <div className={styles.movieTile__action}>
          <button
            className={styles.movieTile__btn}
            onClick={() => setOpen(true)}
          >
            <IconContext.Provider value={{ color: 'var(--white)' }}>
              <BsThreeDotsVertical />
            </IconContext.Provider>
          </button>
          {open && (
            <div className={styles.movieTile__dd}>
              <BaseDropdown
                options={[
                  { name: 'Edit', value: 'edit' },
                  { name: 'Delete', value: 'delete' },
                ]}
                onSelected={optionSelected}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.movieTile__info}>
        <div>
          <h2 className={styles.movieTile__title}>{title}</h2>
          <div className={styles.movieTile__genres}>{genres.join(', ')}</div>
        </div>
        <div className={styles.movieTile__year}>{release_date.slice(0, 4)}</div>
      </div>
    </div>
  );
};

export default MovieTile;
