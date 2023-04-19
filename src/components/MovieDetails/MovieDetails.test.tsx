import { render } from '@testing-library/react';
import { IMovieDetails } from '../../types';
import MovieDetails from './MovieDetails';

const movieMock: IMovieDetails = {
  poster_path: 'http://example.com/image.png',
  title: 'Test Movie',
  release_date: '2022',
  genres: ['Comedy', 'Drama'],
  vote_average: '7.5',
  duration: '1h 30min',
  description: 'This is a test movie.',
};

const setup = (movie = movieMock) => {
  const handleCloseMock = jest.fn();
  const utils = render(
    <MovieDetails movie={movie} handleClose={handleCloseMock} />
  );
  return { ...utils };
};

describe('MovieDetails', () => {
  it('renders movie details correctly', () => {
    const { getByRole, getByText } = setup();

    expect(getByRole('img')).toHaveAttribute('src', movieMock.poster_path);
    expect(getByRole('img')).toHaveAttribute('alt', movieMock.title);
    expect(getByText(movieMock.title)).toBeInTheDocument();
    expect(getByText(movieMock.genres.join(', '))).toBeInTheDocument();
    expect(getByText(movieMock.release_date.toString())).toBeInTheDocument();
    expect(getByText(movieMock.duration!)).toBeInTheDocument();
    expect(getByText(movieMock.description!)).toBeInTheDocument();
  });

  it('renders rating when it is present', () => {
    const { getByText } = setup();

    expect(getByText(movieMock.vote_average!.toString())).toBeInTheDocument();
  });

  it('does not render rating when it is not present', () => {
    const { queryByText } = setup({ ...movieMock, vote_average: undefined });

    expect(queryByText(movieMock.vote_average!.toString())).toBeNull();
  });
});
