import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EmailSentPage.css';
import { sendEmail } from '../utils/user-utils';

const EmailSentMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="emailSentMessageContainer">
      <form className="form">
        <h2 className="emailSentMessageHeading">Email with link to reset password has been sent.</h2>
        <button
          type="button"
          className="link"
          onClick={() => navigate('/')}
        >
          Back to Sign in.
        </button>
      </form>
    </div>
  );
};

export default EmailSentMessage;
