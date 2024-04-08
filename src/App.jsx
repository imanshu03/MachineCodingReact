import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes
} from 'react-router-dom';
import './index.scss';
import { paths } from './path';

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          {paths.map((item) => (
            <NavLink to={item.route} key={item.route}>
              {item.name}
            </NavLink>
          ))}
        </div>
        <Routes>
          <Route path="/" element={null} />
          {paths.map((item) => (
            <Route
              exact
              path={item.route}
              element={item.element}
              key={item.route}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
