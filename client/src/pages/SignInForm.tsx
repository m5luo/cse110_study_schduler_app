import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SignInForm.css';
import { loginUser } from '../utils/user-utils';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Username:', username);
//     console.log('Password:', password);
//     loginUser({username: username, password: password, id: -1})
//   };
//   const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username: username, password: password, email: "" });
      const token = response.token;
      
      if (!token) {
        return alert('Invalid username or password');
      }

      // Store the token in local storage
      localStorage.setItem('token', token);
      console.log(response)
      console.log(response.token)

      // Redirect to the protected route
      navigate('/home')
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="signInContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="signInHeading">Sign in</h2>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
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
