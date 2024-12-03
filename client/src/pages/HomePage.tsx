import React from 'react';
import Calendar from './Calendar.js';
import Navbar from './Navbar.js';
import '../App.css';
import NotesPage from './NotesPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
