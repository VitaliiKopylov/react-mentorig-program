import { render } from '@testing-library/react';
import { IMovieDetails } from '../../types';
import MovieDetails from './MovieDetails';

const testMovie: IMovieDetails = {
  imageUrl: 'http://example.com/image.png',
  name: 'Test Movie',
  releaseYear: 2022,
  genres: ['Comedy', 'Drama'],
  rating: 7.5,
  duration: '1h 30min',
  description: 'This is a test movie.',
};

describe('MovieDetails', () => {
  it('renders movie details correctly', () => {
    const { getByRole, getByText } = render(<MovieDetails movie={testMovie} />);

    expect(getByRole('img')).toHaveAttribute('src', testMovie.imageUrl);
    expect(getByRole('img')).toHaveAttribute('alt', testMovie.name);
    expect(getByText(testMovie.name)).toBeInTheDocument();
    expect(getByText(testMovie.genres.join(', '))).toBeInTheDocument();
    expect(getByText(testMovie.releaseYear.toString())).toBeInTheDocument();
    expect(getByText(testMovie.duration!)).toBeInTheDocument();
    expect(getByText(testMovie.description!)).toBeInTheDocument();
  });

  it('renders rating when it is present', () => {
    const { getByText } = render(<MovieDetails movie={testMovie} />);

    expect(getByText(testMovie.rating!.toString())).toBeInTheDocument();
  });

  it('does not render rating when it is not present', () => {
    const { queryByText } = render(
      <MovieDetails movie={{ ...testMovie, rating: undefined }} />
    );

    expect(queryByText(testMovie.rating!.toString())).toBeNull();
  });
});