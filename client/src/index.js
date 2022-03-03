import "./config.js";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import GA4React from "ga-4-react";
const ga4react = new GA4React(process.env.REACT_APP_GA_TRACKING_CODE);
// alert(process.env.REACT_APP_GA_TRACKING_CODE);
(async _ => {
  try {
    await ga4react.initialize();
  } catch (err) {
    console.log("using adblocker");
  }
  ReactDOM.render(<App />, document.getElementById("root"));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
