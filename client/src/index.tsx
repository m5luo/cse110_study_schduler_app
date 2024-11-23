import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // TypeScript ensures type safety here
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log app performance or remove if unnecessary
reportWebVitals(console.log);
