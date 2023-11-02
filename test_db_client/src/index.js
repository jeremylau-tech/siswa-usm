const express = require('express')
const app = express()
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const port = process.env.PORT || 3030;

const root = ReactDOM.createRoot(document.getElementById('root'));

app.get('/', (req, res) => res.send('Hello World! Onexlab updated version 2'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

app.listen(port, (err) => {
  if (err) {
    console.log('Error::', err);
  }
    console.log(`Onexlab app listening on port ${port}`);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
