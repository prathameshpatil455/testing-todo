import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Item } from '../item';

const sampleTodo = { id: 1, title: 'Sample Todo', completed: false };

// Creating a item rendering function for all test cases
const renderTodoItem = (todo) => {
  const dispatch = jest.fn();
  render(<Item todo={todo} dispatch={dispatch} index={0} />);
  return { dispatch };
};


// Check if the todo item is rendered with the correct title
test('Renders todo items correctly', () => {

  const { dispatch } = renderTodoItem(sampleTodo);

  expect(screen.getByTestId('todo-item')).toBeInTheDocument();
  expect(screen.getByTestId('todo-item-label')).toHaveTextContent('Sample Todo');
  expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();
  expect(screen.getByTestId('todo-item-button')).toBeInTheDocument();
});


// Check if the toggle function works correctly
test('Toggles todo completion when checkbox is clicked', () => {
  const { dispatch } = renderTodoItem(sampleTodo);

  fireEvent.click(screen.getByTestId('todo-item-toggle'));

  expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_ITEM', payload: { id: 1 } });
});


// Check to renders todo for different examples
test('renders todo item with different example', () => {
  const SecondTodo = { id: 2, title: 'Another Todo', completed: true };

  renderTodoItem(SecondTodo);

  expect(screen.getByTestId('todo-item-label')).toHaveTextContent('Another Todo');
  expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();
});