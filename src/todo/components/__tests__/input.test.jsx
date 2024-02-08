import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../input';


// To check if the input has correct attributes and values
test('Renders input with correct placeholder and label', () => {
  render(<Input onSubmit={() => {}} placeholder="Placeholder Type here..." label="Label" />);

  expect(screen.getByTestId('text-input')).toHaveAttribute('placeholder', 'Placeholder Type here...');
  expect(screen.getByLabelText('Label')).toBeInTheDocument();
});


// To verify that on Submit the value is passed with hasValidMin and Santize function 
test('calls onSubmit with sanitized value when Enter key is pressed', () => {
  const onSubmit = jest.fn();

  render(<Input onSubmit={onSubmit} />);

  fireEvent.change(screen.getByTestId('text-input'), { target: { value: 'Test&"evaluate' } });
  fireEvent.keyDown(screen.getByTestId('text-input'), { key: 'Enter', code: 'Enter' });

  expect(onSubmit).toHaveBeenCalledWith('Test&amp;&quot;evaluate');
});


  
  