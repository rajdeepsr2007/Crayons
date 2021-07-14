import React, { useEffect, useState } from 'react';
import Canvas from '../../../components/Play/Canvas';
import * as actions from '../../../store/actions/';
import {connect} from 'react-redux';

const CanvasDraw = (props) => {

    const {socket , room , user } = props;
    const drawing = room.turn === user;
    const [socketTimeout , setSockettimeout] = useState(null);

    const onChange = (canvasPath) => {
        if( drawing){
            if( socketTimeout )
                clearTimeout(socketTimeout);
            const updatedTimeout = setTimeout(() => {
                socket.emit(
                    'canvas-update',
                    { roomId : room.roomId , canvasPath }
                )
            } , 100);
            setSockettimeout(updatedTimeout);
        }
    }

    return(
        <Canvas 
        onChange={onChange}
        canvasPath={room.canvasPath}
        drawing={drawing}
        />
    )
}

const mapStateToProps = state => {
    return{
        room : state.waiting.room,
        user : state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdateRoom : (data) => dispatch(actions.updateRoom(data))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(CanvasDraw);