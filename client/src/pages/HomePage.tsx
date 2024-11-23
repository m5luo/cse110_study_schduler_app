import React from 'react';
import Calendar from './Calendar.js';
import Navbar from './Navbar.js';
import '../App.css';

const HomePage = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="app-content">
        <Calendar />
      </div>
    </div>
  );
};

export default HomePage;
