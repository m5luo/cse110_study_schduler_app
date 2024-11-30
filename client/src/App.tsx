import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import ForgotPasswordForm from './pages/ForgotPasswordForm';
import ResetPasswordForm from './pages/ResetPasswordForm';
import HomePage from './pages/HomePage';
import { AppProvider } from './context/AppContext';
import AccountCreatedMessage from './pages/AccountCreatedMessage';
import EmailSentMessage from './pages/EmailSentMessage';
import PasswordResetMessage from './pages/PasswordResetMessage';
import NotesPage from './pages/NotesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/account-created" element={<AccountCreatedMessage />} />
        <Route path="/email-sent" element={<EmailSentMessage />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/password-reset-message" element={<PasswordResetMessage />} />
        <Route path="/home" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
};

export default App;