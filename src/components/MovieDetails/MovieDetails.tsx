import clsx from 'clsx';
import { VscSearch } from 'react-icons/vsc';
import { IconContext } from 'react-icons';

import BaseImage from '@components/BaseImage';
import { IMovieDetails } from '../../types';
import { convertMinutesToHoursAndMinutes } from '../../utils/duration';

import styles from './styles.module.scss';

interface IMovieDetailsProps {
  movie: IMovieDetails;
  handleClose: () => void;
}

const MovieDetails = ({ movie, handleClose }: IMovieDetailsProps) => {
  const {
    poster_path,
    title,
    release_date,
    genres,
    vote_average,
    runtime,
    overview,
  } = movie;
  return (
    <article className={styles.movieDetails}>
      <div className={clsx(styles.movieDetails__inner, 'container')}>
        <IconContext.Provider
          value={{ color: 'var(--accent_color)', size: '28px' }}
        >
          <button
            className={styles.movieDetails__closeBtn}
            onClick={handleClose}
          >
            <VscSearch />
          </button>
        </IconContext.Provider>
        <BaseImage
          className={styles.movieDetails__image}
          src={poster_path}
          alt={title}
        />
        <div className={styles.movieDetails__info}>
          <header className={styles.movieDetails__header}>
            <h2 className={clsx(styles.movieDetails__title, 'hero-title')}>
              {title}
            </h2>
            {vote_average && (
              <div className={styles.movieDetails__rating}>{vote_average}</div>
            )}
          </header>
          <div className={styles.movieDetails__genres}>{genres.join(', ')}</div>
          <div className={styles.movieDetails__stats}>
            <div>{release_date.slice(0, 4)}</div>
            {runtime && <div>{convertMinutesToHoursAndMinutes(runtime)}</div>}
          </div>
          <div className={styles.movieDetails__description}>{overview}</div>
        </div>
      </div>
    </article>
  );
};

export default MovieDetails;
