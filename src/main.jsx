import React, { Profiler } from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// add a font form material ui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import { store } from "./redux";

// function onRender(
//   id,
//   phase,
//   actualDuration,
//   baseDuration,
//   startTime,
//   commitTime
// ) {
//   console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
//   // Aggregate or log render timings...
// }
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Profiler id="App" onRender={onRender}> */}
      <App />
      {/* </Profiler> */}
    </Provider>
  </React.StrictMode>
);
