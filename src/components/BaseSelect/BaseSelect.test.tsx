import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BaseSelect from './BaseSelect';

describe('BaseSelect', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('renders header with default text', () => {
    const { getByText } = render(<BaseSelect options={options} onChange={onChange} selected={[]} />);
    expect(getByText('Select an option')).toBeInTheDocument();
  });

  test('renders header with selected options', () => {
    const { getByText } = render(<BaseSelect options={options} onChange={onChange} selected={['option1']} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  test('toggles BaseSelect visibility', () => {
    const { getByTestId } = render(<BaseSelect options={options} onChange={onChange} selected={[]} />);
    const header = getByTestId('BaseSelect-header');
    fireEvent.click(header);
    expect(getByTestId('BaseSelect-options')).toBeInTheDocument();
    fireEvent.click(header);
    expect(getByTestId('BaseSelect-options')).not.toBeInTheDocument();
  });

  test('selects option', () => {
    const { getByText, getByTestId } = render(<BaseSelect options={options} onChange={onChange} selected={[]} />);
    const header = getByTestId('BaseSelect-header');
    fireEvent.click(header);
    const option = getByText('Option 1');
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(['option1']);
  });

  test('deselects option', () => {
    const { getByText, getByTestId } = render(<BaseSelect options={options} onChange={onChange} selected={['option1']} />);
    const header = getByTestId('BaseSelect-header');
    fireEvent.click(header);
    const option = getByText('Option 1');
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith([]);
  });
});