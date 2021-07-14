import React, { Fragment } from 'react';
import Alert from '../Feedback/Alert/alert';
import classes from './custom-input.module.css';

const CustomInputs = (props) => {

    const inputs = [];
    const { disabled } = props;
    for( const control in props.controls ){

        if( props.controls[control].type === 'text' 
            || props.controls[control].type === 'number'
            || props.controls[control].type === 'password'
            ){
            inputs.push(
                <Fragment key={control} >
                    {
                        props.controls[control].label ?
                        <h3>
                            {
                                props.controls[control].label
                            }
                        </h3>
                        : null
                    }
                    <input
                    type={props.controls[control].type}
                    value={props.controls[control].value}
                    placeholder={props.controls[control].placeholder}
                    onChange={(event) => props.onChange(control,event)}
                    className={classes.input}
                    max={props.controls[control].max}
                    min={props.controls[control].min}
                    step={props.controls[control].step}
                    disabled={disabled}
                    />
                    {
                        props.showErrors ? 
                        <Alert type="error">
                            {props.controls[control].error}
                        </Alert> : null
                    } 
                </Fragment>  
            )
        }else{
            inputs.push(
                <Fragment key={control} >
                    <textarea
                    type={props.controls[control].type}
                    value={props.controls[control].value.join(' ')}
                    placeholder={props.controls[control].placeholder}
                    onChange={(event) => props.onChange(control,event)}
                    rows='3'
                    cols='10'
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
        
    }

    return(
        <Fragment>
            {inputs}
        </Fragment>
    )

}

export default CustomInputs;