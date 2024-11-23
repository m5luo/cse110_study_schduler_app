import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Sign in page exists', () => {
  render(<App />);
  const title = screen.getByText(/Sign In/i);
  expect(title).toBeInTheDocument();
});
