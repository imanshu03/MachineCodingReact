import React from "react";
import { NavLink } from "react-router-dom";
import { paths } from "../path";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to={paths.colorPalette}>Random Color Palette</NavLink>
      <NavLink to={paths.joystickGrid}>Joystick Grid</NavLink>
      <NavLink to={paths.ticTacToe}>Tic Tac Toe</NavLink>
      <NavLink to={paths.virtualList}>Virtual List</NavLink>
    </div>
  );
};

export default Navbar;
