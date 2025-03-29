import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home'; // ← Home.jsx로 연결

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
