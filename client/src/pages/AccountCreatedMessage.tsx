import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AccountCreationSuccessPage.css';
import { sendEmail } from '../utils/user-utils';

const AccountCreatedMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="accountCreatedMessageContainer">
      <form className="form">
        <h2 className="accountCreatedMessageHeading">Your account has been successfully registered.</h2>
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

export default AccountCreatedMessage;
