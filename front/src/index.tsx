import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import Dashboard from './pages/Dashboard/Dashboard';
import { defaultTheme } from './main/theme';
import './index.css';

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
