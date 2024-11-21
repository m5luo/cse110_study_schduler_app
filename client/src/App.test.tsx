import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('save event button exists', () => {
  render(<App />);
  const saveButton = screen.getByText(/Save/i);
  expect(saveButton).toBeInTheDocument();
});
