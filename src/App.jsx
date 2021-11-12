import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import JoystickGrid from "./JoystickGrid/Components/JoystickGrid";
import Navbar from "./Navbar/Navbar";
import { paths } from "./path";
import RandomColorPalette from "./RandomColorPalette";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={null} />
          <Route
            path={paths.joystickGrid}
            element={<JoystickGrid gridSize={5} />}
          />
          <Route
            path={paths.colorPalette}
            element={<RandomColorPalette limit={20} offset={5} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
