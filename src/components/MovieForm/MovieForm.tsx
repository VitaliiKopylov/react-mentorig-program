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
    name: '',
    releaseYear: '',
    imageUrl: '',
    rating: '',
    genres: [],
    duration: '',
    description: '',
  });

  useEffect(() => {
    if (initialFormData) {
      console.log('FORM DATA::::', initialFormData)
      setFormData({ ...initialFormData });
    }
  }, []);

  const handleInput = (name: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className={styles.form}>
      <BaseInput
        id="name"
        labelText="Title"
        value={formData.name}
        onChange={(val) => handleInput('name', val)}
      />
      <BaseInput
        id="releaseYear"
        labelText="Release Date"
        value={formData.releaseYear as string}
        onChange={(val) => handleInput('releaseYear', val)}
        type="date"
      />
      <BaseInput
        id="imageUrl"
        labelText="Movie URL"
        value={formData.imageUrl}
        onChange={(val) => handleInput('imageUrl', val)}
      />
      <BaseInput
        id="rating"
        labelText="Rating"
        value={formData.rating as string}
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
        <BaseButton type="reset" variant='outlined'>Reset</BaseButton>
        <BaseButton>Submit</BaseButton>
      </div>
    </form>
  );
};

export default MovieForm;
