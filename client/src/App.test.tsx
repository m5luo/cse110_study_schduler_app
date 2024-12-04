import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import * as userUtils from './utils/user-utils'
import {jest} from '@jest/globals';
import App from './App';
import SignInForm from './pages/SignInForm';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import { API_BASE_URL } from './constants';

jest.mock('./utils/user-utils')
const mockLoginUser = userUtils.loginUser as jest.Mock;
const mockCreateUser   = userUtils.createUser as jest.Mock;
const mockSendEmail = userUtils.sendEmail as jest.Mock;
const mockUpdateUser = userUtils.updateUser as jest.Mock;

describe('Sign in page tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('First page in sign in page', () => {
        render(<App />);
        const linkElement = screen.getByText(/Sign in/i);
        expect(linkElement).toBeInTheDocument();
      });

    test('Create an account page exists', () => {
        render(<App />);
        const createAccountButton = screen.getByText(/Create an account/i);
        fireEvent.click(createAccountButton);
        const GetStartedButton = screen.getByText(/Get Started/i);
        expect(GetStartedButton).toBeInTheDocument();
    });

    test('Navigates to Sign In Form from Sign Up Form, then back to Sign Up Form', () => {
        window.history.pushState({}, 'Sign Up Page', '/signup');
    
        render(<App />);
    
        const signInLink = screen.getByText(/Already have an account\? Sign in!/i);
        fireEvent.click(signInLink);
    
        const signInButton = screen.getByText(/Log In/i);
        expect(signInButton).toBeInTheDocument();

        const accountButton = screen.getByText(/Create an account/i);
        fireEvent.click(accountButton);
        const getStartedButton = screen.getByText(/Get Started/i);
        expect(getStartedButton).toBeInTheDocument();

    });

    test('Navigates to Forgot Your Password Form', () => {
        window.history.pushState({}, 'Sign Up Page', '/');
    
        render(<App />);
    
        const passwordLink = screen.getByText(/Forgot your password\?/i);
        fireEvent.click(passwordLink);
    
        const passwordHeading = screen.getByText(/Forgot Password/i);
        expect(passwordHeading).toBeInTheDocument();
    });

    test('Successful login submits credentials and navigates to home page', async () => {
        const mockLoginResponse = { token: 'fake-jwt-token' };
        mockLoginUser.mockResolvedValue(mockLoginResponse);

        window.history.pushState({}, 'Sign In Page', '/');
        render(<App />);

        const usernameInput = screen.getByPlaceholderText(/Username/i);
        const passwordInput = screen.getByPlaceholderText("Password");
        const signInButton = screen.getByLabelText('login-button');
    
        fireEvent.change(usernameInput, { target: { value: 'TestOneUser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(signInButton);
    
        await waitFor(() => {
          expect(userUtils.loginUser).toHaveBeenCalledWith({
            email: "",
            username: 'TestOneUser',
            password: 'password123',
          });
          expect(userUtils.loginUser).toHaveBeenCalledTimes(1);
        });
    
        expect(localStorage.getItem('token')).toBe('fake-jwt-token');

        const homePageElement = await screen.findByText(/Calendar/i);
        expect(homePageElement).toBeInTheDocument();
      });

      test('Unsuccessful login does not submit credentials and does not navigate to home page', async () => {
        mockLoginUser.mockRejectedValue(new Error('Failed to login user'));

        window.history.pushState({}, 'Sign In Page', '/');
        render(<App />);

        const usernameInput = screen.getByPlaceholderText(/Username/i);
        const passwordInput = screen.getByPlaceholderText("Password");
        const signInButton = screen.getByLabelText('login-button');
    
        fireEvent.change(usernameInput, { target: { value: 'NonExistentUser' } });
        fireEvent.change(passwordInput, { target: { value: 'nonpassword' } });
        fireEvent.click(signInButton);
    
        await waitFor(() => {
          expect(userUtils.loginUser).toHaveBeenCalledWith({
            email: "",
            username: 'NonExistentUser',
            password: 'nonpassword',
          });
          expect(userUtils.loginUser).toHaveBeenCalledTimes(1);
        });
    
        expect(localStorage.getItem('token')).toBeNull();

        const homePageElement = await screen.queryByText(/Calendar/i);
        expect(homePageElement).not.toBeInTheDocument();
    });

      
});

