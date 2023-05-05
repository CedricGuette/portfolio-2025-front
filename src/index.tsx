import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { LangProvider } from './components/utils/context/LangProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LangProvider>
      <Router>
        <App />
      </Router>
    </LangProvider>
  </React.StrictMode>
);
