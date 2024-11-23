import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import App from "../App";
import ResetPasswordForm from '../pages/ResetPasswordForm';

describe("Reset Password Page", () => {
    test('renders reset password form', () => {
        render(
            <BrowserRouter>
                <ResetPasswordForm />
            </BrowserRouter>
        )
        const inputElement = screen.getByPlaceholderText('New Password');
        expect(inputElement).toBeInTheDocument();
    });
});