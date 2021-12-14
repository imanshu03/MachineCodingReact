import React from "react";

const Square = ({ value, idx }) => {
  return (
    <div data-idx={idx} className="square">
      {value}
    </div>
  );
};

export default Square;
