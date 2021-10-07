import React from 'react';
import classes from './button.module.css';

const Button = (props) => {
    const {style , disabled , color} = props;
    const buttonClasses = [classes.button];
    if( disabled ){
        buttonClasses.push(classes.disabled)
    }

    if( color == 'blue' )
        buttonClasses.push(classes.blue)

    if( color == 'green' )
        buttonClasses.push(classes.green)

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