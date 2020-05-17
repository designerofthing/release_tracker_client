import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import './index.css';

axios.defaults.baseURL = "http://localhost:3000";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
