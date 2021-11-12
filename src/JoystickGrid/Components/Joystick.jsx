import React from "react";

const prefix = "cta";

const Joystick = (props) => {
  const { setActivePosition, activePosition } = props;

  const handleClick = (xPos, yPos) => {
    let { x, y } = activePosition;
    x += xPos;
    y += yPos;
    setActivePosition(x, y);
  };

  return (
    <div className={prefix}>
      <div className={`${prefix}-row`}>
        <button onClick={() => handleClick(-1, 0)}>Up</button>
      </div>
      <div className={`${prefix}-row middle`}>
        <button onClick={() => handleClick(0, -1)}>Left</button>
        <span className="block" />
        <button onClick={() => handleClick(0, 1)}>Right</button>
      </div>
      <div className={`${prefix}-row`}>
        <button onClick={() => handleClick(1, 0)}>Down</button>
      </div>
    </div>
  );
};

export default Joystick;
