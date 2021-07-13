import React from 'react';
import CanvasDraw from './Canvas';

const Play = (props) => {

    const {socket} = props;

    return(
        <CanvasDraw 
        socket={socket}
        />
    )
}

export default Play;