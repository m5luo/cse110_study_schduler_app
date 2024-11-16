import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEventForm from './Event/AddEventForm';
import EventList from './Event/EventList';
import { AppProvider } from './context/AppContext';
const App = () => {
  return (
    <AppProvider>
        <EventList/>
        <AddEventForm/>
    </AppProvider>
    
  );
};

export default App;