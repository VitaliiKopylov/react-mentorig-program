import { render, waitFor } from '@testing-library/react';
import { IMovieDetails } from '../../types';
import MovieDetails from './MovieDetails';
import { MemoryRouter } from 'react-router-dom';

const movieMock: IMovieDetails = {
  id: '2',
  poster_path: 'http://example.com/image.png',
  title: 'Test Movie',
  release_date: '2022',
  genres: ['Comedy', 'Drama'],
  vote_average: '7.5',
  runtime: '90',
  overview: 'This is a test movie.',
};

let mockFetch = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => movieMock,
  } as Response);

beforeAll(() => {
  global.fetch = jest.fn().mockImplementation(() => mockFetch());
});

afterAll(() => {
  // jest.restoreAllMocks();
  // global.fetch.mockClear();
  // delete global.fetch;
});

const setup = (movie = movieMock) => {
  const utils = render(
    <MemoryRouter initialEntries={[`/${movieMock.id}`]}>
      <MovieDetails />
    </MemoryRouter>
  );
  return { ...utils };
};

describe('MovieDetails', () => {
  it('renders movie details correctly', async () => {
    const { getByRole, getByText } = setup();

    await waitFor(() => {
      expect(getByRole('img')).toHaveAttribute('src', movieMock.poster_path);
      expect(getByRole('img')).toHaveAttribute('alt', movieMock.title);
      expect(getByText(movieMock.title)).toBeInTheDocument();
      expect(getByText(movieMock.genres.join(', '))).toBeInTheDocument();
      expect(getByText(movieMock.release_date.toString())).toBeInTheDocument();
      expect(getByText('1h 30m')).toBeInTheDocument();
      expect(getByText(movieMock.overview!)).toBeInTheDocument();
    });
  });

  // it('renders rating when it is present', () => {
  //   const { getByText } = setup();

  //   expect(getByText(movieMock.vote_average!.toString())).toBeInTheDocument();
  // });

  // it('does not render rating when it is not present', () => {
  //   const { queryByText } = setup({ ...movieMock, vote_average: undefined });

  //   expect(queryByText(movieMock.vote_average!.toString())).toBeNull();
  // });
});
