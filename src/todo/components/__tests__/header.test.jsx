import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../header';


// creating a function to render header for all test cases
const renderHeader = () => {
  const dispatchMock = jest.fn();
  render(<Header dispatch={dispatchMock} />);
  return { dispatchMock };
};

// To check if the header component is rendered correctly
test('renders header with title and input', () => {
  
  renderHeader();

  expect(screen.getByText('todos')).toBeInTheDocument();
  expect(screen.getByTestId('text-input')).toBeInTheDocument();
});


// To check if the there is a dispatch for adding a new item
test('calls dispatch with correct action on adding a new item', () => {
    
    const { dispatchMock } = renderHeader();
    
    const inputElement = screen.getByTestId('text-input');
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'ADD_ITEM', payload: { title: 'New Todo' } });
    expect(inputElement).toHaveValue('');
  });

