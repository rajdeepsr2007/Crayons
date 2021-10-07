import React from 'react';
import classes from './alert.module.css';

const Alert = (props) => {
    const {type , style , hide} = props;
    const alertClasses = [classes.alert];
    if( type === 'success' )
        alertClasses.push(classes.success);
    else
        alertClasses.push(classes.error);
    const alert = (
        <div className={alertClasses.join(' ')} style={style}  >
            {props.children}
            {hide ? <div className={classes.hide} >
                Hover over to see the Room Id
            </div> : null }
        </div>
    )
    return(
        alert
    )
}

export default Alert;