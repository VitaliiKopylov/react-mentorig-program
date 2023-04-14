import clsx from 'clsx';

import { IMovieDetails } from '../../types';

import styles from './styles.module.scss';

interface IMovieDetailsProps {
  movie: IMovieDetails;
}

const MovieDetails = ({ movie }: IMovieDetailsProps) => {
  const { imageUrl, name, releaseYear, genres, rating, duration, description } =
    movie;
  return (
    <article className={styles.movieDetails}>
      <div className={clsx(styles.movieDetails__inner, 'container')}>
        <img className={styles.movieDetails__image} src={imageUrl} alt={name} />
        <div className={styles.movieDetails__info}>
          <header className={styles.movieDetails__header}>
            <h2 className={clsx(styles.movieDetails__title, 'hero-title')}>
              {name}
            </h2>
            {rating && (<div className={styles.movieDetails__rating}>{rating}</div>)}
          </header>
          <div className={styles.movieDetails__genres}>{genres.join(', ')}</div>
          <div className={styles.movieDetails__stats}>
            <div>{releaseYear}</div>
            <div>{duration}</div>
          </div>
          <div className={styles.movieDetails__description}>{description}</div>
        </div>
      </div>
    </article>
  );
};

export default MovieDetails;
