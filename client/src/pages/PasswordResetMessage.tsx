import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PasswordResetMessage.css';
import { sendEmail } from '../utils/user-utils';

const PasswordResetMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="passwordResetMessageContainer">
      <form className="form">
        <h2 className="passwordResetMessageHeading">Password has been reset.</h2>
        <button
          type="button"
          className="link"
          onClick={() => navigate('/')}
        >
          Click here to Sign in now!
        </button>
      </form>
    </div>
  );
};

export default PasswordResetMessage;
