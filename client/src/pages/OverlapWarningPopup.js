// src/components/OverlapWarningPopup.js
import React from 'react';
import './OverlapWarningPopup.css';

const OverlapWarningPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="overlap-popup-overlay">
      <div className="overlap-popup">
        <h3>Warning</h3>
        <p>This event overlaps with an existing event. Do you want to schedule it anyway?</p>
        <div className="overlap-popup-buttons">
          <button onClick={onCancel} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="confirm-button">Schedule Anyway</button>
        </div>
      </div>
    </div>
  );
};

export default OverlapWarningPopup;