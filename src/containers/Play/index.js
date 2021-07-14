import React  from 'react';
import Alerts from './Alerts';
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
            <Alerts
            socket={socket}
            />
        </div>
        
    )
}

export default (Play);