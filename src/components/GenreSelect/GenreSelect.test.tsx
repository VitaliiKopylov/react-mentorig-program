import { render, fireEvent, screen } from '@testing-library/react';
import GenreSelect from './GenreSelect';

const setup = (activeGenre?: string) => {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const onSelect = jest.fn();
  const utils = render(
    <GenreSelect genres={genres} onSelect={onSelect} activeGenre={activeGenre || genres[0]} />,
  );
  return {
    onSelect,
    genres,
    ...utils,
  };
};

describe('GenreSelect Component', () => {
  it('renders all genres passed in props', () => {
    const { genres } = setup();

    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('highlights a selected genre passed in props', () => {
    const activeGenre = 'Comedy';
    setup(activeGenre);

    const activeGenreWrapper = screen.getByText(activeGenre).closest('div');
    expect(activeGenreWrapper).toHaveClass('genresFiltersItemActive');
  });

  it('calls "onSelect" callback with correct genre after a click event on a genre button', () => {
    const { onSelect } = setup();
    const selectedGenre = 'Documentary';

    const genreButton = screen.getByText(selectedGenre);
    fireEvent.click(genreButton);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(selectedGenre);
  });
});
