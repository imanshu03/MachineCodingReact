import React from "react";

const RowRenderer = ({ data, top, height }) => {
  return (
    <div className="row" style={{ top, height }}>
      <span>{data.id}</span>
      <span>{data.first_name}</span>
      <span>{data.last_name}</span>
      <span>{data.gender}</span>
    </div>
  );
};

export default RowRenderer;
