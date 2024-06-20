import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const tasks = window.__INITIAL_DATA__ || [];

ReactDOM.hydrate(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>,
  document.getElementById('root')
);
