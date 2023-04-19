import SortControl from './SortControl';
import { render, fireEvent, screen } from '@testing-library/react';

import { sortingOptions } from '../../constants';

const setup = () => {
  const onSelectedMock = jest.fn();
  const utils = render(<SortControl onSelected={onSelectedMock} />);
  const { getByTestId } = utils;
  const trigger = getByTestId('sort-trigger');

  return {
    trigger,
    onSelectedMock,
    ...utils,
  };
};

describe('SortControl', () => {
  it('should render component with correct initial state', () => {
    const { trigger } = setup();
    const dd = screen.queryByTestId('sort-dd');

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent(sortingOptions[0].name);
    expect(dd).not.toBeInTheDocument();
  });

  it('should open dropdown on click', () => {
    const { trigger } = setup();

    fireEvent.click(trigger);

    const dd = screen.queryByTestId('sort-dd');
    expect(dd).toBeInTheDocument();
  });

  it('should trigger onSelected callback function', () => {
    const { trigger, getByTestId, onSelectedMock } = setup();

    fireEvent.click(trigger);

    const titleBtn = screen.getByTestId('title');
    fireEvent.click(titleBtn);
    expect(onSelectedMock).toBeCalled();
  });
});
