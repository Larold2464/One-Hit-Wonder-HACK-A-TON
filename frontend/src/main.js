import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const root = createRoot(document.querySelector('#app'));
root.render(createElement(AuthProvider, null, createElement(HomePage)));
