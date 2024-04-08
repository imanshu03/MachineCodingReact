import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

const directionFunc = {
  left: (x) => x - 1,
  right: (x) => x + 1,
  top: (y) => y - 1,
  bottom: (y) => y + 1
};

const directions = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom'
};

const generateFoodCoord = (boardSize) => {
  const coord = Math.floor(Math.random() * boardSize);
  return coord;
};

const INTIAL_SNAKE_SPEED = 300;

const Game = ({ boardSize = 20, initialSnakeLength = 2 }) => {
  const [snakeState, setSnakeState] = useState({
    x: 3,
    y: 3,
    length: initialSnakeLength,
    direction: directions.right,
    start: false
  });

  const [foodState, setFoodState] = useState({
    x: 0,
    y: 0
  });

  const directionChange = useRef({
    previousDirection: null,
    x: 0,
    y: 0,
    length: 0
  });

  const checkIfCoordinateInSnake = (x, y) => {
    switch (true) {
      case snakeState.direction === directions.left ||
        snakeState.direction === directions.right:
        return (
          y >= snakeState.y &&
          y <= snakeState.y + snakeState.length &&
          x === snakeState.x
        );
      case snakeState.direction === directions.top ||
        snakeState.direction === directions.bottom:
        return (
          x >= snakeState.x &&
          x <= snakeState.x + snakeState.length &&
          snakeState.y === y
        );
      default:
        return false;
    }
  };

  const moveSnake = () => {
    let outOfBounds = false;
    let [x, y] = [snakeState.x, snakeState.y];
    switch (true) {
      case snakeState.direction === directions.left:
        snakeState.y = snakeState.y - 1;
        if (snakeState.y < 0) outOfBounds = true;
        break;
      case snakeState.direction === directions.right:
        snakeState.y = snakeState.y + 1;
        if (snakeState.y + snakeState.length >= boardSize) outOfBounds = true;
        break;
      case snakeState.direction === directions.top:
        snakeState.x = snakeState.x - 1;
        if (snakeState.x < 0) outOfBounds = true;
        break;
      case snakeState.direction === directions.bottom:
        snakeState.x = snakeState.x + 1;
        if (snakeState.x + snakeState.length >= boardSize) outOfBounds = true;
        break;
      default:
        return null;
    }
    x = outOfBounds ? x : snakeState.x;
    y = outOfBounds ? y : snakeState.y;
    setSnakeState({ ...snakeState, x, y, start: !outOfBounds });
  };

  const changeDirection = (direction) => {
    
  };

  useEffect(() => {
    let coord = generateFoodCoord(boardSize);
    while (checkIfCoordinateInSnake(coord, coord)) {
      coord = generateFoodCoord(boardSize);
    }
    setFoodState({ x: coord, y: coord });
    setSnakeState((old) => ({ ...old, start: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let intervalId;
    if (snakeState.start) {
      const diffOfSpeed = (snakeState.length - initialSnakeLength) * 10;
      intervalId = setInterval(moveSnake, INTIAL_SNAKE_SPEED - diffOfSpeed);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snakeState.start, snakeState.length]);

  useEffect(() => {
    function handleDirection(e) {
      const keyDirections = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
      };
      changeDirection(keyDirections[e.key]);
    }
    if (snakeState.start) document.addEventListener('keydown', handleDirection);
    return () => document.removeEventListener('keydown', handleDirection);
  }, [snakeState.start]);

  const generateBoxColor = (x, y) => {
    switch (true) {
      case checkIfCoordinateInSnake(x, y):
        return 'black';
      case x === foodState.x && y === foodState.y:
        return 'red';
      default:
        return 'transparent';
    }
  };

  return (
    <div className="snake-game">
      {Array.from({ length: boardSize }, (e, xIndex) => (
        <div className="snake-line">
          {Array.from({ length: boardSize }, (e, yIndex) => (
            <div
              className="snake-box"
              key={`${xIndex}.${yIndex}`}
              style={{
                backgroundColor: generateBoxColor(xIndex, yIndex)
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
