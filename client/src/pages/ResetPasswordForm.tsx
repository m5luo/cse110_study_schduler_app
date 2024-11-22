import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ResetPasswordForm.css';
import { updateUser } from '../utils/user-utils';

const initUser = {
    username: "",
    password: "",
    id: -1
}

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(initUser)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    
    if (password !== confirmPassword) {
        return alert('Passwords must match');
    }
    else {
        setUser({ ...user, password: password });
        console.log(user);
        updateUser(password);
    }
  };

  return (
    <div className="resetPasswordContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="resetPasswordHeading">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="resetPasswordInput"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="resetPasswordInput"
          required
        />
        <button type="submit" className="resetPasswordButton">
          Reset Password
        </button>
        <button
          type="button"
          className="link"
          onClick={() => navigate('/')}
        >
          Back to Sign in
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
