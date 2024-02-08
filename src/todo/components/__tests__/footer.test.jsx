import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../footer';

// Creating a footer rendering function for all test cases
const renderFooter = (todos) => {
  const dispatch = jest.fn();

  return render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatch} />
    </MemoryRouter>
  );
};


// To check footer is rendered with correct count and navigation links 
test('Renders footer component with correct count of activeTodos and navigation links', () => {
  const todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
    { id: 3, title: 'Exercise', completed: false },
    { id: 4, title: 'Write code', completed: true },
    { id: 5, title: 'Learn React', completed: false },
  ];
  
  renderFooter(todos);

  // Checking if the footer component is rendered
  expect(screen.getByTestId('footer')).toBeInTheDocument();

  expect(screen.getByText('3 items left!')).toBeInTheDocument();

  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();
});


// To check if clear completed button is disabled
test('Disables "Clear completed" button when all are active todos(not completed)', () => {
  const todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
    { id: 3, title: 'Exercise', completed: false },
    { id: 4, title: 'Write code', completed: false },
    { id: 5, title: 'Learn React', completed: false },    
  ];

  renderFooter(todos);

  expect(screen.getByText('Clear completed')).toBeDisabled();
});


// To check if clear completed button is enabled when completed todos are present
test('Enables "Clear completed" button when there are completed todos', () => {
  const todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
    { id: 3, title: 'Exercise', completed: false },
    { id: 4, title: 'Write code', completed: true },
    { id: 5, title: 'Learn React', completed: true },    
  ];
    
    renderFooter(todos);
  
    expect(screen.getByText('Clear completed')).not.toBeDisabled();
});
  

