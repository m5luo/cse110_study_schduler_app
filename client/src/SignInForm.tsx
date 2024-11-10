import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInForm.css';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signInContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="signInHeading">Sign in</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="signInInput"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="signInInput"
          required
        />
        <div className="linkContainer">
          <button
            type="button"
            className="link"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot your password?
          </button>
        </div>
        <button type="submit" className="loginButton">
          Log in
        </button>
        <button
          type="button"
          className="createAccountButton"
          onClick={() => navigate('/signup')}
        >
          Create an account
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
