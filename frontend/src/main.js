import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage.jsx';

const root = createRoot(document.querySelector('#app'));
root.render(createElement(HomePage));
