import React, { useState } from 'react';
import './ForgotPasswordForm.css';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset email sent to:', email);
  };

  return (
    <div className="forgotPassContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="forgotPassHeading">Forgot Password</h2>
        <p className="forgotPassDescription">
          If you have an account registered, you will receive an email with instructions on how to reset your password.
        </p>
        <span className="label">Email</span>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="forgotPassInput"
          required
        />
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
