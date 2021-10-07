import React from 'react';
import { Fragment } from 'react';
import classes from './message.module.css'

const Message = (props) => {

    const {color , username , message} = props;
    let content = null;
    if( message.type ){
        content = (
            <span className={classes.info} >
                {username}
                { message.type === 'drawing' ?
                  ' is now drawing'
                  : ' guessed the word'
                }
            </span>
        )
    }else{
        content = (
            <Fragment>
                <span 
                style={{ color }}
                className={classes.username}
                >
                    {username}
                </span>
                {message.text}
            </Fragment>
        )
    }

    const messageClasses = [classes.message];
    if( message.type && message.type !== 'drawing' )
        messageClasses.push(classes.yellow)

    const messageObject = (
        <div 
        className={messageClasses.join(' ')} >
            {content}
        </div>
    )

    return(
        messageObject
    )
}

export default Message;