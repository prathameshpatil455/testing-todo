import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../input';

test('renders input with correct placeholder and label', () => {
  render(<Input onSubmit={() => {}} placeholder="Test Placeholder" label="Test Label" />);

  // Check if the input has the correct placeholder and label
  expect(screen.getByTestId('text-input')).toHaveAttribute('placeholder', 'Test Placeholder');
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});

test('calls onSubmit with sanitized value when Enter key is pressed', () => {
  const onSubmitMock = jest.fn();

  render(<Input onSubmit={onSubmitMock} />);

  // Type a value in the input and press Enter
  fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'Test&<Value>' } });
  fireEvent.keyDown(screen.getByTestId('text-input'), { key: 'Enter', code: 'Enter' });

  // Check if onSubmit is called with the sanitized value
  expect(onSubmitMock).toHaveBeenCalledWith('Test&amp;&lt;Value&gt;');
});
