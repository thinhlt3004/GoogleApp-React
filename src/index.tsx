import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ResultContextProvider } from "./Context/ResultContextProvider";
ReactDOM.render(
  <Router>
    <ResultContextProvider>
      <App />
    </ResultContextProvider>
  </Router>,
  document.getElementById("root")
);
