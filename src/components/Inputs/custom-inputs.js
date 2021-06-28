import React, { Fragment } from 'react';
import classes from './custom-input.module.css';

const CustomInputs = (props) => {

    const inputs = [];
    for( const control in props.controls ){
        inputs.push(
            <input
            key={control}
            type={props.controls[control].type}
            value={props.controls[control].value}
            placeholder={props.controls[control].placeholder}
            onChange={(event) => props.onChange(control,event)}
            className={classes.input}
            />
        )
    }

    return(
        <Fragment>
            {inputs}
        </Fragment>
    )

}

export default CustomInputs;