import SearchForm from './SearchForm';
import { render, fireEvent } from '@testing-library/react';

const setup = (initialValue = 'test') => {
  const onSearchMock = jest.fn();
  const utils = render(
    <SearchForm initialValue={initialValue} onSearch={onSearchMock} />,
  );
  const { getByTestId } = utils;
  const input = getByTestId('search-input') as HTMLInputElement;
  const submitBtn = getByTestId('search-submit');

  return {
    onSearchMock,
    input,
    submitBtn,
    ...utils,
  };
};

describe('SearchForm', () => {
  const defaultSearch = 'Search film';
  const newSearch = 'Love Actually';

  test('component renders an input with the value equal to initial value passed in props', () => {
    const { input } = setup(defaultSearch);

    expect(input.value).toBe(defaultSearch);
  });

  test('calls onSearch prop with proper value after "click" event on the Submit button', () => {
    const { input, submitBtn, onSearchMock } = setup();

    fireEvent.change(input, { target: { value: newSearch } });
    fireEvent.click(submitBtn);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith(newSearch);
  });

  test('calls onSearch prop with proper value after Submit form event', () => {
    const { input, submitBtn, onSearchMock } = setup();

    fireEvent.change(input, { target: { value: newSearch } });
    fireEvent.submit(submitBtn); // This is similar to pressing the Enter button.

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith(newSearch);
  });
});
