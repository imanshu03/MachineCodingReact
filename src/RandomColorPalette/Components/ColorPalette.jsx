import React, {useMemo} from 'react';

const generateRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const ColorPalette = (props) => {

    const {size, setColor} = props;

    const handleSetColor = (e) => {
        const { color } = e.target.dataset;
        setColor(color);
        e.stopPropagation();
    };

    const componentHtml = useMemo(() => {
        if (size) {
            let output = [];
            for (let i = 0; i < size; i++) {
                const color = generateRandomColor();
                output.push(<td key={i} style={{ backgroundColor: color }} data-color={color} />);
            }
            return <tr className="palette" onClick={handleSetColor}>{output.map(e => e)}</tr>;
        }
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    return componentHtml;
};

export default ColorPalette;