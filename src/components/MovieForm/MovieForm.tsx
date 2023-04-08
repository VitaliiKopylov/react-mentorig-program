import { useState } from 'react';
import BaseInput from '../BaseInput/BaseInput';

import styles from './styles.module.scss';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    movieUrl: '',
    rating: '',
    genre: '',
    runtime: '',
    overview: '',
  });

  const handleInput = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className={styles.form}>
      <BaseInput
        id="title"
        labelText="title"
        value={formData.title}
        onChangeHandler={(val) => handleInput('title', val)}
      />
      <BaseInput
        id="releaseDate"
        labelText="Release Date"
        value={formData.releaseDate}
        onChangeHandler={(val) => handleInput('releaseDate', val)}
        type="date"
      />
      <BaseInput
        id="movieUrl"
        labelText="Movie URL"
        value={formData.movieUrl}
        onChangeHandler={(val) => handleInput('movieUrl', val)}
      />
      <BaseInput
        id="rating"
        labelText="rating"
        value={formData.rating}
        onChangeHandler={(val) => handleInput('rating', val)}
      />
      <BaseInput
        id="genre"
        labelText="genre"
        value={formData.genre}
        onChangeHandler={(val) => handleInput('genre', val)}
      />
      <BaseInput
        id="runtime"
        labelText="runtime"
        value={formData.runtime}
        onChangeHandler={(val) => handleInput('runtime', val)}
      />
    </form>
  );
};

export default MovieForm;
