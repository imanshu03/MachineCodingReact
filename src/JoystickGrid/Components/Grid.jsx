import React, { useMemo, useCallback } from "react";

const Grid = (props) => {
  const { pos, gridSize, prefix } = props;

  const getActiveClassName = useCallback(
    (x, y) => {
      if (x === pos.x && y === pos.y) return "active";
      return "";
    },
    [pos]
  );

  const returningHtml = useMemo(() => {
    const dummyArr = Array(gridSize).fill("");

    return dummyArr.map((e, idx) => (
      <div key={idx} className={`${prefix}-row`}>
        {dummyArr.map((e, idx2) => (
          <span
            key={idx2}
            className={`${prefix}-row-item ${getActiveClassName(idx, idx2)}`}
          />
        ))}
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize, getActiveClassName]);

  return <div className={prefix}>{returningHtml}</div>;
};

export default Grid;
