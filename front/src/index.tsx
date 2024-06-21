import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import Dashboard from './pages/Dashboard/Dashboard';
import { defaultTheme } from './main/theme';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/1" />} />
          <Route path="/:aquarium_id" element={<Dashboard />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
