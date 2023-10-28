import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TopicsProvider } from "./context/TopicsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TopicsProvider>
          <App />
        </TopicsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
