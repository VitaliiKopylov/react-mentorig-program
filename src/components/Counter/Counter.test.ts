import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Counter from './Counter';

test('calling render with the same component on the same container does not remount', () => {
  render(<Counter initialValue={3} />)
  expect(screen.getByTestId('number-display')).toHaveTextContent('3')
})