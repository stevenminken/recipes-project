import React from 'react';
import styles from './Button.module.css';

const Button = ({children, onClick, color, height, marginBottom, marginTop}) => {
    const style = {
        backgroundColor: color,
        height: height,
        marginBottom: marginBottom,
        marginTop: marginTop,
    };
    return (
        <button className={styles['button']} onClick={onClick} style={style}>
            {children}
        </button>
    );
};

export default Button;