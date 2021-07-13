import React from 'react';
import Message from './Message';
import classes from './messages.module.css';

const Messages = (props) => {

    const {users , messages} = props;
    const messageObjects = (
        <div className={classes.messages} >
            {
                messages.map(message => {
                    const { color , username } = users[message.userId];
                    return <Message
                            key={message}
                            message={message}
                            color={color}
                            username={username}
                            />
                })
            }
        </div>
    )

    return(
        messageObjects
    )
}

export default Messages;