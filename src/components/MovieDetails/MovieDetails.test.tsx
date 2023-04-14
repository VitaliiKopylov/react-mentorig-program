import { render } from '@testing-library/react';
import { IMovieDetails } from '../../types';
import MovieDetails from './MovieDetails';

const movieMock: IMovieDetails = {
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
    const { getByRole, getByText } = render(<MovieDetails movie={movieMock} />);

    expect(getByRole('img')).toHaveAttribute('src', movieMock.imageUrl);
    expect(getByRole('img')).toHaveAttribute('alt', movieMock.name);
    expect(getByText(movieMock.name)).toBeInTheDocument();
    expect(getByText(movieMock.genres.join(', '))).toBeInTheDocument();
    expect(getByText(movieMock.releaseYear.toString())).toBeInTheDocument();
    expect(getByText(movieMock.duration!)).toBeInTheDocument();
    expect(getByText(movieMock.description!)).toBeInTheDocument();
  });

  it('renders rating when it is present', () => {
    const { getByText } = render(<MovieDetails movie={movieMock} />);

    expect(getByText(movieMock.rating!.toString())).toBeInTheDocument();
  });

  it('does not render rating when it is not present', () => {
    const { queryByText } = render(
      <MovieDetails movie={{ ...movieMock, rating: undefined }} />
    );

    expect(queryByText(movieMock.rating!.toString())).toBeNull();
  });
});