import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';

const Waiting = (props) => {

    const [roomId , setRoomId] = useState(null);
    const {onLoadRoom} = props;

    useEffect(() => {
        if( !roomId ){
            setRoomId(
                props.match.params.roomId
            )
            onLoadRoom(
                props.match.params.roomId
            )
        }
    },[])

    return(
        <h1>
            {roomId}
        </h1>
    )
}

const mapStateToProps = state => {
    return{
        room : state.waiting.room
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadRoom : (roomId) => dispatch(actions.loadRoom(roomId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Waiting);