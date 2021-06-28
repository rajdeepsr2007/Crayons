import React from 'react';
import classes from './alert.module.css';

const Alert = (props) => {
    const {type} = props;
    const alertClasses = [classes.alert];
    if( type === 'success' )
        alertClasses.push(classes.success);
    else
        alertClasses.push(classes.error);
    const alert = (
        <div className={alertClasses.join(' ')} >
            {props.children}
        </div>
    )
    return(
        alert
    )
}

export default Alert;