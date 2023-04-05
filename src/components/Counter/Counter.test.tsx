import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('component renders initial value provided in props', () => {
    render(<Counter initialValue={3} />);
    expect(screen.getByTestId('number-display')).toHaveTextContent('3');
  });

  test('click event on "decrement" button decrements the displayed value', () => {
    render(<Counter  initialValue={3} />);
    const button = screen.getByTestId('number-decrement');
    fireEvent.click(button);
    expect(screen.getByTestId('number-display')).toHaveTextContent('2');
  });

  test('click event on "increment" button increments the displayed value', () => {
    render(<Counter  initialValue={3} />);
    const button = screen.getByTestId('number-increment');
    fireEvent.click(button);
    expect(screen.getByTestId('number-display')).toHaveTextContent('4');
  });
});
