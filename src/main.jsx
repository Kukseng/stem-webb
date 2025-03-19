// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./redux/store/store.js";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "85531888519-3ns12d70tv91s7lklcj4mk6nrjrqoamv.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router>
            <App />
          </Router>
        </GoogleOAuthProvider>
      </StrictMode>
    </PersistGate>
  </Provider>
);