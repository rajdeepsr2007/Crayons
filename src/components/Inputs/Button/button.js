import React from 'react';
import classes from './button.module.css';

const Button = (props) => {
    const {style} = props;
    const button = (
        <div 
        className={classes.button}
        onClick={() => props.onClick()} 
        style={style}
        >
            {props.children}
        </div>
    )

    return(
        button
    )
}

export default Button;