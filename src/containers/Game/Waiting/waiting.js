import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import Card from '../../../components/UI/Card/card';
import Loader from '../../../components/UI/Loader/loader-big';
import Error from '../../../components/Rooms/Waiting/Error/error';

const Waiting = (props) => {

    const [roomId , setRoomId] = useState(null);
    const {onLoadRoom , loading , error} = props;

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

    if( loading ){
        return (
            <Card>
                <Loader />
            </Card>
        )
    }

    if(error){
        return <Error
                history={props.history}
                >
                    {props.error}
                </Error>
    }

    return(
        <h1>
            {roomId}
        </h1>
    )
}

const mapStateToProps = state => {
    return{
        room : state.waiting.room,
        error : state.waiting.error,
        loading : state.waiting.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoadRoom : (roomId) => dispatch(actions.loadRoom(roomId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Waiting);