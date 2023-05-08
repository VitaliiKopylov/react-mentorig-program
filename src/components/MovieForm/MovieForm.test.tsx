import { render } from '@testing-library/react';
import MovieForm from './MovieForm';
import { IMovieDetails } from '../../types';

const formData = {
  poster_path:
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kXTdxfgCRGg38Q90WG9iJyTYzqP.jpg',
  title: 'Shaun of the Dead',
  release_date: '2004-01-01',
  genres: ['Comedy', 'Horror'],
  vote_average: '8.5',
  runtime: '1h 39m',
  overview:
    "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
};

const setup = (formData?: IMovieDetails) => {
  const form = render(<MovieForm initialFormData={formData} formType='add' />);
  const { getByLabelText } = form;

  const titleInput = getByLabelText('Title') as HTMLInputElement;
  const releaseInput = getByLabelText('Release Date') as HTMLInputElement;
  const movieUrlInput = getByLabelText('Movie URL') as HTMLInputElement;
  const ratingInput = getByLabelText('Rating') as HTMLInputElement;
  const genresSelect = form.container.querySelector('#genre');
  const durationInput = getByLabelText('Runtime') as HTMLInputElement;
  const descriptionArea = getByLabelText('Description') as HTMLTextAreaElement;

  return {
    ...form,
    titleInput,
    releaseInput,
    movieUrlInput,
    ratingInput,
    genresSelect,
    durationInput,
    descriptionArea,
  };
};

describe('MovieForm component', () => {
  it('should render empty form initially when no form data provided', () => {
    const {
      titleInput,
      releaseInput,
      movieUrlInput,
      ratingInput,
      genresSelect,
      durationInput,
      descriptionArea,
    } = setup();

    expect(titleInput.value).toBe('');
    expect(releaseInput.value).toBe('');
    expect(movieUrlInput.value).toBe('');
    expect(ratingInput.value).toBe('');
    expect(genresSelect).toHaveTextContent('Select Genre');
    expect(durationInput.value).toBe('');
    expect(descriptionArea.value).toBe('');
  });

  it('should render form when form data provided', () => {
    const {
      titleInput,
      releaseInput,
      movieUrlInput,
      ratingInput,
      genresSelect,
      durationInput,
      descriptionArea,
    } = setup(formData);

    expect(titleInput.value).toBe(formData.title);
    expect(releaseInput.value).toBe(formData.release_date);
    expect(movieUrlInput.value).toBe(formData.poster_path);
    expect(ratingInput.value).toBe(formData.vote_average.toString());
    expect(genresSelect).toHaveTextContent(formData.genres.join(', '));
    expect(durationInput.value).toBe(formData.runtime);
    expect(descriptionArea.value).toBe(formData.overview);
  });
});
