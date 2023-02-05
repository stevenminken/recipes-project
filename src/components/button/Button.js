import React from 'react';
import styles from './Button.module.css';

const Button = ({children, onClick, color, height, marginBottom}) => {
    const style = {
        backgroundColor: color,
        height: height,
        marginBottom: marginBottom,
    };
    return (
        <button className={styles['button']} onClick={onClick} style={style}>
            {children}
        </button>
    );
};

export default Button;