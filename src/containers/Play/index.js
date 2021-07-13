import React , { Fragment } from 'react';
import CanvasDraw from './Canvas';
import Messages from './Message';
import classes from './play.module.css';

const Play = (props) => {

    const {socket} = props;

    return(
        <div className={ classes.play } >
            <CanvasDraw 
            socket={socket}
            />
            <Messages />
        </div>
        
    )
}

export default Play;