import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  const userList = await waitFor(() => screen.getByTestId('user-list'));
  expect(linkElement).toBeInTheDocument();
});
