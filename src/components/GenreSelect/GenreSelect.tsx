  import clsx from 'clsx';
  import styles from './styles.module.css';

  interface GenreSelectProps {
    genres: string[];
    activeGenre: string;
    onSelect: (genre: string) => void;
  }

  const GenreSelect = ({ genres, activeGenre, onSelect }: GenreSelectProps) => {
    
    const onSelectHandler = (genre: string) => {
      onSelect(genre);
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
              data-cy={`${genre}-genre-select-wrapper`}
            >
              <button
                className={styles.genresFiltersBtn}
                onClick={(event) => onSelectHandler(genre)}
                data-cy={`${genre}-genre-select`}
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
