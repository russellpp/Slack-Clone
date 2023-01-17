import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
