import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Main } from '../main';
import { MemoryRouter } from 'react-router-dom';

const sampleTodos = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
  { id: 3, title: 'Todo 3', completed: false },
  { id: 4, title: 'Todo 4', completed: true },
];

// Check if the main component is rendered with the correct structure
test('renders main component with correct structure', () => {
  render(
    <MemoryRouter>
      <Main todos={sampleTodos} dispatch={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByTestId('main')).toBeInTheDocument();
  expect(screen.getByTestId('toggle-all')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
});
