import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../header';

test('renders header with title and input', () => {
  const dispatchMock = jest.fn();

  render(<Header dispatch={dispatchMock} />);

  // Check if the title is rendered
  expect(screen.getByText('todos')).toBeInTheDocument();

  // Check if the input component is rendered
  expect(screen.getByTestId('text-input')).toBeInTheDocument();
});

test('calls dispatch with correct action when adding a new item', () => {
  const dispatchMock = jest.fn();

  render(<Header dispatch={dispatchMock} />);

  // Type a new todo in the input and press Enter
  fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'New Todo' } });
  fireEvent.keyDown(screen.getByTestId('text-input'), { key: 'Enter', code: 'Enter' });

  // Check if dispatch is called with the correct action and payload
  expect(dispatchMock).toHaveBeenCalledWith({ type: 'ADD_ITEM', payload: { title: 'New Todo' } });
});
