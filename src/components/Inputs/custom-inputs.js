import React, { Fragment } from 'react';
import Alert from '../Feedback/Alert/alert';
import classes from './custom-input.module.css';

const CustomInputs = (props) => {

    const inputs = [];
    for( const control in props.controls ){
        inputs.push(
            <Fragment key={control} >
                <input
                type={props.controls[control].type}
                value={props.controls[control].value}
                placeholder={props.controls[control].placeholder}
                onChange={(event) => props.onChange(control,event)}
                className={classes.input}
                />
                {
                    props.showErrors ? 
                    <Alert type="error">
                        {props.controls[control].error}
                    </Alert> : null
                } 
            </Fragment>  
        )
    }

    return(
        <Fragment>
            {inputs}
        </Fragment>
    )

}

export default CustomInputs;