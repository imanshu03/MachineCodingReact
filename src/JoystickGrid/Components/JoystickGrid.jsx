import React, { useState, useCallback } from "react";
import Grid from "./Grid";
import Joystick from "./Joystick";
import "./index.scss";

const prefix = "grid";

const JoystickGrid = (props) => {
  const { gridSize } = props;

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const setActivePosition = useCallback(
    (x, y) => {
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        setPos({ ...pos, x, y });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gridSize]
  );

  return (
    <div className="moveable-grid">
      <Grid gridSize={gridSize} pos={pos} prefix={prefix} />
      <Joystick setActivePosition={setActivePosition} activePosition={pos} />
    </div>
  );
};

export default JoystickGrid;
