import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <NavLink to="/rcp">Random Color Palette</NavLink>
            <NavLink to="/grid">Joystick Grid</NavLink>
        </div>
    );
};

export default Navbar;