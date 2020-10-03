import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import Root from './Root';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Root>,
  document.getElementById('root')
);
