import React, { useEffect, useState } from 'react';
import ColorPalette from './ColorPalette';
import TableBody from './TableBody';

const Table = (props) => {

    const { size, showSelectedColor } = props;

    const [tableData, setTableData] = useState({});
    const [color, setColor] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if (size === 0) {
            setColor('');
        }
    }, [size]);

    const handleColorChange = (e) => {
        if (color !== '') {
            const { key } = e.target.dataset;
            let data = tableData;
            data[key] = color;
            setTableData({ ...data });
        }
        e.stopPropagation();
    };

    const handleMouseDown = (e) => {
        handleColorChange(e);
        setIsPressed(true);
        e.stopPropagation();
    };

    return (
        <>
            {showSelectedColor && (
                <div className="selected-color">
                    <p>Selected Color</p>
                    <div style={{ backgroundColor: color }} />
                </div>
            )}
            <table onClick={handleColorChange} onMouseDown={handleMouseDown} onMouseUp={() => setIsPressed(false)} onMouseOver={isPressed ? handleColorChange : null}>
                <tbody>
                    <TableBody data={tableData} size={size} />
                    <ColorPalette setColor={setColor} size={size} />
                </tbody>
            </table>
        </>
    );
};

export default Table;