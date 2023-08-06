import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css'; // contains global styles for the application.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
