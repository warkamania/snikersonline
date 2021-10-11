import React from 'react';
import {HashRouter as Router} from "react-router-dom"
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


