// src/components/Navbar.js
import React from 'react';
import '../style/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


const Navbar = () => {
//   const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link className="nav-item" to='/home'>Calendar</Link>
        <Link className="nav-item" to='/notes'>Notes</Link>
      </div>
      <div className="profile-icon">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;