import React from 'react';
import classes from './message.module.css'

const Message = (props) => {

    const {color , username , message} = props;

    const messageObject = (
        <div 
        className={classes.message} >
            <span 
            style={{ color }}
            className={classes.username}
            >
                {username}
            </span>
            {message.text}
        </div>
    )

    return(
        messageObject
    )
}

export default Message;