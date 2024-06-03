import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "../components/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* To manage the authentication state correctly, the app component must be wrapped into authprovider component */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
