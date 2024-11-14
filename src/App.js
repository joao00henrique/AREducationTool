// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './contexts/AppContext'; // Make sure to create AppContext.js

const API_URL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <AppProvider apiUrl={API_URL}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// AppContext.js
import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const AppProvider = ({ apiUrl, children }) => {
  // Here you can add more application-level state objects or functions
  
  const value = { apiUrl };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// SomeComponent.js
import React from 'react';
import { useAppContext } from './contexts/AppContext';

const SomeComponent = () => {
  const { apiUrl } = useAppContext(); // Now apiUrl can be accessed directly

  return <div>API URL is: {apiUrl}</div>;
};

export default SomeComponent;