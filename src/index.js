import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

axios.defaults.baseURL = "http://localhost:3000";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
