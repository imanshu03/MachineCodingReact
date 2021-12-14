import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import JoystickGrid from "./JoystickGrid/Components/JoystickGrid";
import Navbar from "./Navbar/Navbar";
import { paths } from "./path";
import RandomColorPalette from "./RandomColorPalette";
import TicTacToe from "./TicTacToe";
import VirtualList from "./VirtualList";

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
          <Route path={paths.ticTacToe} element={<TicTacToe />} />
          <Route path={paths.virtualList} element={<VirtualList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
