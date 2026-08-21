import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/main.css";
import "./styles/studio.css";
import "./styles/studio-dark.css";
import "./styles/studio-light.css";

document.body.classList.add("oceanai-studio-dark");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
