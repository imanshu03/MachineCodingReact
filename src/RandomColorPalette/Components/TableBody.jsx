import React, { useMemo } from "react";

const TableBody = (props) => {
  const { data, size } = props;

  const renderTableBody = useMemo(() => {
    if (size && data) {
      const tableElements = [];
      for (let i = 0; i < size; i++) {
        let rowElements = [];
        for (let j = 0; j < size; j++) {
          const key = `${i}.${j}`;
          const color = data[key] || "";
          rowElements.push(
            <td key={key} data-key={key} style={{ backgroundColor: color }} />
          );
        }
        tableElements.push(<tr key={i}>{rowElements.map((e) => e)}</tr>);
      }
      return <>{tableElements.map((e) => e)}</>;
    }
    return <></>;
  }, [size, data]);

  return renderTableBody;
};

export default TableBody;
