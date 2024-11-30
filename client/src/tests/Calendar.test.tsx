import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import App from "../App";
import Calendar from '../pages/Calendar';

describe("Calendar Page Test", () => {
    test('renders save event button', () => {
        render(
            <BrowserRouter>
                <Calendar />
            </BrowserRouter>
        )
        const saveButton = screen.getByText(/Submit/i);
        expect(saveButton).toBeInTheDocument();
    });
});

// test('save event button exists', () => {
//   render(<App />);
//   const saveButton = screen.getByText(/Save/i);
//   expect(saveButton).toBeInTheDocument();
// });
