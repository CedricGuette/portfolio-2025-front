import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LangProvider } from './components/utils/context/LangProvider';
import { MenuProvider } from './components/utils/context/MenuProvider';
import { AlertBoxContextProvider } from './components/utils/context/AlertBoxContext';
import AlertBox from './components/AlertBox';
import { CookiesProvider } from './components/utils/context/CookiesProvider';
import CookiesPopUp from './components/CookiesPopUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <LangProvider>
        <AlertBoxContextProvider>
          <MenuProvider>
            <Router>
              <CookiesPopUp />
              <AlertBox />
              <App />
            </Router>
          </MenuProvider>
        </AlertBoxContextProvider>
      </LangProvider>
    </CookiesProvider>
  </React.StrictMode>
);
