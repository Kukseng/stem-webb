import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App.jsx';
import { store } from './redux/store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <GoogleOAuthProvider clientId="85531888519-3ns12d70tv91s7lklcj4mk6nrjrqoamv.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </StrictMode>
  </Provider>
);