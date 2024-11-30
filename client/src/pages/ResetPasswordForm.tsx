import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../style/ResetPasswordForm.css';
import { updateUser } from '../utils/user-utils';

const initUser = {
    username: "",
    password: "",
    id: -1
}

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(initUser)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);

    const token = searchParams.get('token') as string;
    
    if (newPassword !== confirmPassword) {
        return alert('Passwords must match');
    }
    else {
        setUser({ ...user, password: newPassword });
        console.log(user);
        const response = await updateUser(token, newPassword);
        if (!response.user_id) {
            return alert("Something went wrong when resetting password.") 
        }
        navigate('/password-reset-message')
    }
  };

  return (
    <div className="resetPasswordContainer">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="resetPasswordHeading">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
