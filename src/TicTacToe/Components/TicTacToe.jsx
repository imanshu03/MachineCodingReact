import React, { useCallback, useEffect, useMemo, useState } from "react";
import Square from "./Square";
import "./index.scss";

function calculateWinner(data, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (data[a] === player && data[b] === data[a] && data[c] && data[a]) {
      return true;
    }
  }
  return false;
}

const TicTacToe = () => {
  const [data, setData] = useState([...Array(9).fill(null)]);
  const [toggleMove, setToggleMove] = useState(true);
  const [winner, setWinner] = useState(false);

  const handleSquareClick = useCallback(
    (e) => {
      if (!winner) {
        let target = e.target;
        const idx = Number(target.dataset.idx);
        if (data[idx] === null) {
          data[idx] = toggleMove ? "O" : "X";
          setData([...data]);
          setToggleMove(!toggleMove);
        }
      }
    },
    [toggleMove, data, winner]
  );

  useEffect(() => {
    const result = calculateWinner(data, toggleMove ? "X" : "O");
    setWinner(result);
  }, [data, toggleMove]);

  const footer = useMemo(() => {
    if (winner) {
      return `Winner: ${toggleMove ? "X" : "O"}`;
    }
    if (data.every(Boolean)) {
      return "Draw";
    } else {
      return `Current move : ${toggleMove ? "O" : "X"}`;
    }
  }, [data, toggleMove, winner]);

  return (
    <div>
      <div className="board" onClick={handleSquareClick}>
        {data.map((e, idx) => (
          <Square key={idx} value={e} idx={idx} />
        ))}
      </div>
      <p>{footer}</p>
    </div>
  );
};

export default TicTacToe;
