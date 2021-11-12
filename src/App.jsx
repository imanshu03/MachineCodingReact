import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss';
import Navbar from './Navbar/Navbar';
import RandomColorPalette from './RandomColorPalette';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/rcp" element={<RandomColorPalette limit={20} offset={5} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
