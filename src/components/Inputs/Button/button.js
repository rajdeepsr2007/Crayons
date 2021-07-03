import React from 'react';
import classes from './button.module.css';

const Button = (props) => {
    const {style , disabled} = props;
    const buttonClasses = [classes.button];
    if( disabled ){
        buttonClasses.push(classes.disabled)
    }
    const button = (
        <div 
        className={buttonClasses.join(' ')}
        onClick={props.onClick} 
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