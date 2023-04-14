import SortControl from './SortControl';
import { render, fireEvent, screen } from '@testing-library/react';
import { SortOptions } from '../../types';

const sortOptions = Object.values(SortOptions);

const setup = () => {
  const utils = render(
    <SortControl />,
  );
  const { getByTestId } = utils;
  const trigger = getByTestId('sort-trigger');

  return {
    trigger,
    ...utils,
  };
};

describe('SortControl', () => {
  it('should render component with correct initial state', () => {
    const { trigger } = setup();
    const dd = screen.queryByTestId('sort-dd');

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent(sortOptions[0]);
    expect(dd).not.toBeInTheDocument();
  });

  it('should open dropdown on click', () => {
    const { trigger } = setup();

    fireEvent.click(trigger);

    const dd = screen.queryByTestId('sort-dd');
    expect(dd).toBeInTheDocument();
  });
});
