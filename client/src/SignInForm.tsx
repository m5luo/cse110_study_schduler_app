import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInForm.css';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem(email);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        alert('Sign in successful!');
        navigate('/'); // Redirect after successful login, change to homepage later
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <div className="signInContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="signInHeading">Sign in</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signInInput"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signInInput"
          required
        />
        <div className="linkContainer">
          <button type="button" className="link" onClick={() => navigate('/forgot-password')}>
            Forgot your password?
          </button>
        </div>
        <button type="submit" className="loginButton">Log in</button>
        <button type="button" className="createAccountButton" onClick={() => navigate('/signup')}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
