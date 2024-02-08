import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../footer';
import { MemoryRouter } from 'react-router-dom';

test('renders footer with correct count and navigation', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ];
  const dispatchMock = jest.fn();

  render(
    <MemoryRouter>
  <Footer todos={todos} dispatch={dispatchMock} />
  </MemoryRouter>);

  // Check if the count is displayed correctly
  expect(screen.getByTestId('footer')).toBeInTheDocument();
  expect(screen.getByText('1 item left!')).toBeInTheDocument();

  // Check if navigation links are present
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();
});

test('calls dispatch when "Clear completed" button is clicked', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ];
  const dispatchMock = jest.fn();

  render(
    <MemoryRouter>
  <Footer todos={todos} dispatch={dispatchMock} />
  </MemoryRouter>);

  // Click the "Clear completed" button
  fireEvent.click(screen.getByText('Clear completed'));

  // Check if dispatch is called with the correct action
  expect(dispatchMock).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
});
