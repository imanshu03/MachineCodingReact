import React, { useState } from 'react';
import Table from './Table';
import './index.scss';

const RandomColorPalette = (props) => {

    const { limit, offset } = props;
    const [size, setSize] = useState(0);

    const handleSizeUpdate = (type) => {
        let newSize = size;
        if ((size === 0 && type === 'dec') || (size === limit && type === 'inc')) return;
        newSize = type === 'inc' ? newSize + offset : newSize - offset;
        setSize(newSize);
    };

    return (
        <div className="color-app">
            <div className="size-input">
                <button onClick={() => handleSizeUpdate('dec')}>-</button>
                <span>{size}</span>
                <button onClick={() => handleSizeUpdate('inc')}>+</button>
            </div>
            <Table size={size} showSelectedColor />
        </div>
    );
};

export default RandomColorPalette;