import React, { useEffect, useState } from "react";
import RowRenderer from "./RowRenderer";
import dummyData from "../data.json";
import "./index.scss";

const VirtualList = ({
  rowHt = 60,
  totalRows = dummyData.length,
  viewportHt = 600,
  bufferRows = 5,
  data = dummyData,
}) => {
  const [idx, setIdx] = useState({
    start: 0,
    last: 0,
  });

  const captureScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const start = Math.max(Math.floor(scrollTop / rowHt) - bufferRows, 0);
    const last = Math.min(
      Math.ceil((scrollTop + viewportHt) / rowHt) + bufferRows - 1,
      totalRows - 1
    );
    setIdx({ ...idx, start, last });
  };

  useEffect(() => {
    const last = Math.ceil(viewportHt / rowHt) + bufferRows - 1;
    setIdx({ ...idx, last });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="virtual-list">
      <div className="header">
        {Object.keys(data[0]).map((key, idx) => (
          <span key={idx}>{key}</span>
        ))}
      </div>
      <div
        onScroll={captureScroll}
        style={{ height: `${viewportHt}px` }}
        className="scroll-box"
      >
        <div className="rows" style={{ height: `${rowHt * totalRows}px` }}>
          {[...data].slice(idx.start, idx.last + 1).map((row, index) => (
            <RowRenderer
              key={index + idx.start}
              top={`${(idx.start + index) * rowHt}px`}
              height={`${rowHt}px`}
              data={row}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
