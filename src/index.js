import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import service worker registration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker for offline support and PWA functionality
// serviceWorkerRegistration.register();

// Register the custom service worker for offline support and PWA functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/custom-sw.js`)
    .then((registration) => {
      console.log('Custom Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Custom Service Worker registration failed:', error);
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
