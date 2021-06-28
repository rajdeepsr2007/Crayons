import React from 'react';
import classes from './button.module.css';

const Button = (props) => {
    const button = (
        <div 
        className={classes.button}
        onClick={() => props.onClick()} >
            {props.children}
        </div>
    )

    return(
        button
    )
}

export default Button;