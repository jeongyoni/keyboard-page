import React from 'react';
import ReactDOM from 'react-dom/client'; // ← Home.jsx로 연결
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
