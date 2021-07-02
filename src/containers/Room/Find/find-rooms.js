import React , {useEffect, useState} from 'react';
import Card from '../../../components/UI/Card/card';
import Button from '../../../components/Inputs/Button/button';
import * as actions from '../../../store/actions/';
import {connect} from 'react-redux';
import Rooms from '../../../components/Rooms/rooms';
import socketIOClient from 'socket.io-client';


const FindRooms = (props) => {

    const {rooms , onFindRooms , user , onUpdateRoom , reset} = props;
    const [endpoint] = useState('http://localhost:9000');
    const [socket,setSocket] = useState(null);

    useEffect(() => {
        if( rooms.length === 0 ){
            onFindRooms()
        }
    } , [reset])


    useEffect(() => {
        return () => {
            reset();
        }
    },[])

    useEffect(() => {
        if( !socket && rooms.length > 0 ){
            const socket = socketIOClient(
                endpoint
            )
            socket.on('connected', () => {
                setSocket(socket);
            })
        }
    },[rooms,endpoint,onUpdateRoom,user])

    const backButton = (
        <Button 
        onClick={
            () => {
                socket.emit('socket-disconnect');
                props.history.push('/menu')
            }
        }
        style={{
            transform : 'scale(0.9)',
            margin : '1rem 0 1rem 0'
        }}>
            {'< Back'}
        </Button>
    )

    const roomsCard = (
        <Card style={{
            justifyContent : 'space-between'
        }}>
            <h3>Rooms</h3>
            <Rooms rooms={props.rooms} />
            {backButton}
        </Card>
    )

    return(
        roomsCard
    )
}

const mapStateToProps = state => {
    return{
        loading : state.room.creating ,
        error : state.room.error, 
        rooms : state.room.rooms,
        user : state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFindRooms : () => dispatch(actions.findRooms()),
        onUpdateRoom : (data) => dispatch(actions.updateRoom(data)),
        reset : () => dispatch(actions.resetRoom())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(FindRooms);