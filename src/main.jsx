// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.js"; // Importing the organized routes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
