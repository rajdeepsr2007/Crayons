import React from 'react';
import Alert from '../Alert';

const TextAlert = (props) => {
    return(
        <Alert>
            <h1 style={{ textAlign : 'center' , color : 'white' , opacity : '100%' }} >
                {props.children}
            </h1>
        </Alert>   
    )
}

export default TextAlert;