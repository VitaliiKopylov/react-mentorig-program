import { useState, useEffect } from 'react';

import BaseInput from '../BaseInput';
import BaseSelect from '../BaseSelect';
import BaseTextarea from '../BaseTextarea';
import BaseButton from '../BaseButton';
import { IMovieDetails, Genres } from '../../types';
import styles from './styles.module.scss';

const genresOptions = Object.values(Genres)
  .filter((genre) => genre !== 'All')
  .map((genre) => ({
    value: genre,
    label: genre,
  }));

interface IMovieFormProps {
  initialFormData?: IMovieDetails;
}

const MovieForm = ({ initialFormData }: IMovieFormProps) => {
  const [formData, setFormData] = useState<IMovieDetails>({
    title: '',
    release_date: '',
    poster_path: '',
    vote_average: '',
    genres: [],
    duration: '',
    description: '',
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData({ ...initialFormData });
    }
  }, []);

  const handleInput = (title: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [title]: value,
    });
  };

  return (
    <form className={styles.form}>
      <BaseInput
        id="title"
        labelText="Title"
        value={formData.title}
        onChange={(val) => handleInput('title', val)}
      />
      <BaseInput
        id="release_date"
        labelText="Release Date"
        value={formData.release_date as string}
        onChange={(val) => handleInput('release_date', val)}
        type="date"
      />
      <BaseInput
        id="imageUrl"
        labelText="Movie URL"
        value={formData.poster_path}
        onChange={(val) => handleInput('poster_path', val)}
      />
      <BaseInput
        id="rating"
        labelText="Rating"
        value={formData.vote_average}
        onChange={(val) => handleInput('rating', val)}
      />
      <BaseSelect
        labelText="Genre"
        id="genre"
        selected={formData.genres}
        options={genresOptions}
        onChange={(selected) => handleInput('genres', selected)}
      />
      <BaseInput
        id="duration"
        labelText="Runtime"
        value={formData.duration}
        onChange={(val) => handleInput('duration', val)}
      />
      <div className={styles.form__textarea}>
        <BaseTextarea
          id="description"
          labelText="Description"
          value={formData.description}
          onChange={(val) => handleInput('description', val)}
          rows={5}
        />
      </div>
      <div className={styles.form__actions}>
        <BaseButton type="reset" variant="outlined">
          Reset
        </BaseButton>
        <BaseButton>Submit</BaseButton>
      </div>
    </form>
  );
};

export default MovieForm;
