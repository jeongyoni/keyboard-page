// src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // src/App.js 파일을 가져옵니다
import './styles.css';    // 스타일시트도 필요하다면

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
