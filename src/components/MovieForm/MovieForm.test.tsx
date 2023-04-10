import { render } from '@testing-library/react';
import MovieForm from './MovieForm';

const formData = {
  imageUrl:
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kXTdxfgCRGg38Q90WG9iJyTYzqP.jpg',
  name: 'Shaun of the Dead',
  releaseYear: "2004-01-01",
  genres: ['Comedy', 'Horror'],
  rating: 8.5,
  duration: '1h 39m',
  description:
    "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
};

const setup = (formData?: any) => {
  const form = render(<MovieForm initialFormData={formData} />);
  const { getByLabelText } = form;

  const nameInput = getByLabelText('Title') as HTMLInputElement;
  const releaseInput = getByLabelText('Release Date') as HTMLInputElement;
  const movieUrlInput = getByLabelText('Movie URL') as HTMLInputElement;
  const ratingInput = getByLabelText('Rating') as HTMLInputElement;
  const genresSelect = form.container.querySelector('#genre');
  const durationInput = getByLabelText('Runtime') as HTMLInputElement;
  const descriptionArea = getByLabelText('Description') as HTMLTextAreaElement;

  return {
    ...form,
    nameInput,
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
      nameInput,
      releaseInput,
      movieUrlInput,
      ratingInput,
      genresSelect,
      durationInput,
      descriptionArea,
    } = setup();

    expect(nameInput.value).toBe('');
    expect(releaseInput.value).toBe('');
    expect(movieUrlInput.value).toBe('');
    expect(ratingInput.value).toBe('');
    expect(genresSelect).toHaveTextContent('Select Genre');
    expect(durationInput.value).toBe('');
    expect(descriptionArea.value).toBe('');
  });

  it('should render form when form data provided', () => {
    const {
      nameInput,
      releaseInput,
      movieUrlInput,
      ratingInput,
      genresSelect,
      durationInput,
      descriptionArea,
    } = setup(formData);

    expect(nameInput.value).toBe(formData.name);
    expect(releaseInput.value).toBe(formData.releaseYear);
    expect(movieUrlInput.value).toBe(formData.imageUrl);
    expect(ratingInput.value).toBe(formData.rating.toString());
    expect(genresSelect).toHaveTextContent(formData.genres.join(', '));
    expect(durationInput.value).toBe(formData.duration);
    expect(descriptionArea.value).toBe(formData.description);
  });
});
