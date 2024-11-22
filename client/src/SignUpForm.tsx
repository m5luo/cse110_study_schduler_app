import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import { createUser } from './utils/user-utils';

const initUser = {
    username: "",
    password: "",
    id: -1
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [user, setUser] = useState(initUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('First Name:', firstName);
    // console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    
    if (password !== confirmPassword) {
        return alert('Passwords must match');
    }
    else {
        setUser({ ...user, username: username, password: password });
        console.log(user);
        createUser({ username: username, password: password, email: email });
    }
  };

  return (
    <div className="signUpContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="signUpHeading">Create an Account</h2>
        <div className="nameContainer">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="nameInput"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="nameInput"
            required
          />
        </div>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="loginInput"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="loginInput"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="loginInput"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="loginInput"
          required
        />
        <button type="submit" className="submitButton">
          Get Started
        </button>
        <button
          type="button"
          className="link"
          onClick={() => navigate('/')}
        >
          Already have an account? Sign in!
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;