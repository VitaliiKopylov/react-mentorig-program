import clsx from 'clsx';
import styles from './styles.module.scss';
import { Genres } from '../../types';

interface GenreSelectProps {
  genres: Genres[] | string[];
  activeGenre: Genres | string;
  onSelect: (genre: Genres | string) => void;
}

const GenreSelect = ({ genres, activeGenre, onSelect }: GenreSelectProps) => {
  const onSelectHandler = (genre: Genres | string) => {
    onSelect(genre);
  };

  return (
    <div className={styles.genresFilters}>
      {genres.map((genre) => (
        <div
          key={genre}
          className={clsx(
            styles.genresFiltersItem,
            activeGenre === genre && styles.genresFiltersItemActive
          )}
          data-cy={`${genre}-genre-select-wrapper`}
        >
          <button
            className={styles.genresFiltersBtn}
            onClick={() => onSelectHandler(genre)}
            data-cy={`${genre}-genre-select`}
          >
            {genre}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GenreSelect;
