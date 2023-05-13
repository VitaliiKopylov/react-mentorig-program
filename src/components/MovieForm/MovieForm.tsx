import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BaseInput from '@components/BaseInput';
import BaseSelect from '@components/BaseSelect';
import BaseTextarea from '@components/BaseTextarea';
import BaseButton from '@components/BaseButton';
import { IMovieDetails, Genres } from '../../types';
import { API_URL } from '../../constants';
import styles from './styles.module.scss';

const genresOptions = Object.values(Genres)
  .filter((genre) => genre !== 'All')
  .map((genre) => ({
    value: genre,
    label: genre,
  }));

interface IMovieFormProps {
  initialFormData?: IMovieDetails;
  formType: 'add' | 'edit';
}

const MovieForm = ({ initialFormData, formType }: IMovieFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IMovieDetails>({
    defaultValues: initialFormData,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IMovieDetails> = async (data) => {
    const method = formType === 'add' ? 'POST' : 'PUT';
    const movie = {
      ...data,
      runtime: parseFloat(data.runtime as string),
      vote_average: parseFloat(data.vote_average as string),
    };
    try {
      await fetch(`${API_URL}/movies`, {
        method,
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(() => {
    reset({
      title: initialFormData?.title,
      release_date: initialFormData?.release_date,
      poster_path: initialFormData?.poster_path,
      vote_average: initialFormData?.vote_average,
      genres: initialFormData?.genres,
      runtime: initialFormData?.runtime,
      overview: initialFormData?.overview,
      id: initialFormData?.id,
    });
  }, [initialFormData, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <BaseInput
            id="title"
            labelText="Title"
            value={field.value}
            onChange={(val) => setValue('title', val)}
            error={errors.title}
          />
        )}
      />
      <Controller
        name="release_date"
        control={control}
        rules={{
          required: true,
          min: {
            value: '1900-01-01',
            message: 'The date must be after 1900-01-01',
          },
          max: {
            value: '2027-01-01',
            message: 'The date must be before 2027-01-01',
          },
        }}
        render={({ field }) => (
          <BaseInput
            id="release_date"
            labelText="Release Date"
            value={field.value}
            onChange={(val) => setValue('release_date', val)}
            error={errors.release_date}
            type="date"
          />
        )}
      />
      <Controller
        name="poster_path"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^(ftp|http|https):\/\/[^ "]+$/,
            message: 'Please enter a valid URL',
          },
        }}
        render={({ field }) => (
          <BaseInput
            id="poster_path"
            labelText="Movie URL"
            value={field.value}
            onChange={(val) => setValue('poster_path', val)}
            error={errors.poster_path}
          />
        )}
      />
      <Controller
        name="vote_average"
        control={control}
        rules={{
          required: true,
          min: {
            value: 1,
            message: 'This field must be at least 1',
          },
          max: {
            value: 10,
            message: 'This field cannot be greater than 10',
          },
          pattern: {
            value: /^\d*\.?\d+$/,
            message: 'Invalid input. Please enter a valid number.',
          },
        }}
        render={({ field }) => (
          <BaseInput
            id="vote_average"
            labelText="Rating"
            value={field.value}
            onChange={(val) => setValue('vote_average', val)}
            error={errors.vote_average}
          />
        )}
      />
      <Controller
        name="genres"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <BaseSelect
            labelText="Genre"
            id="genre"
            selected={field.value}
            options={genresOptions}
            onChange={(selected) => setValue('genres', selected)}
            // @ts-expect-error unhandled error
            error={errors.genres}
          />
        )}
      />
      <Controller
        name="runtime"
        control={control}
        rules={{
          required: true,
          min: {
            value: 1,
            message: 'This field must be at least 1',
          },
          max: {
            value: 3000,
            message: 'This field cannot be greater than 3000',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Invalid input. Please enter a valid number.',
          },
        }}
        render={({ field }) => (
          <BaseInput
            id="runtime"
            labelText="Runtime"
            value={field.value}
            onChange={(val) => setValue('runtime', val)}
            error={errors.runtime}
          />
        )}
      />
      <div className={styles.form__textarea}>
        <Controller
          name="overview"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 50,
              message: 'Description must be at least 50 characters long.',
            },
          }}
          render={({ field }) => (
            <BaseTextarea
              id="overview"
              labelText="Description"
              value={field.value}
              onChange={(val) => setValue('overview', val)}
              error={errors.overview}
              rows={5}
            />
          )}
        />
      </div>
      <div className={styles.form__actions}>
        <BaseButton type="reset" variant="outlined" onClick={() => reset()}>
          Reset
        </BaseButton>
        <BaseButton type="submit">Submit</BaseButton>
      </div>
    </form>
  );
};

export default MovieForm;
