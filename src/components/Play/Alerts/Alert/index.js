import React from 'react';
import classes from './alert.module.css';

const Alert = (props) => {

    const alert = (
        <div className={ classes.backdrop } >
            {props.children}
        </div>
    )

    return(
        alert
    )
}

export default Alert;