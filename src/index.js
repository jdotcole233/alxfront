import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Start from './screens/Start';
import Home from './screens/home/home'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import AuthProvider from './context/AuthContext';

axios.defaults.baseURL = "http://alxback.comfybroker.com/api";

ReactDOM.render(
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => <Start {...props} />} />
        <Route path="/home" render={(props) => <Home {...props} />} />
      </Switch>
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
