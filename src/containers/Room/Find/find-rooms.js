import React , {useEffect, useState} from 'react';
import Card from '../../../components/UI/Card/card';
import Button from '../../../components/Inputs/Button/button';
import * as actions from '../../../store/actions/';
import {connect} from 'react-redux';
import Rooms from '../../../components/Rooms/rooms';
import socketIOClient from 'socket.io-client';
import Loader from '../../../components/UI/Loader/loader-big';
import Alert from '../../../components/Feedback/Alert/alert';
import baseURL from '../../../baseURL';


const FindRooms = (props) => {

    const {rooms , onFindRooms , user , onUpdateRoom , reset} = props;
    const [endpoint] = useState(baseURL + ':9000');
    const [socket,setSocket] = useState(null);

    useEffect(() => {
        if( rooms.length === 0 ){
            onFindRooms()
        }
    } , [reset])


    useEffect(() => {
        return () => {
            if( socket ){
                socket.off('room-update');
                socket.emit('socket-disconnect');
            }
            reset();
        }
    },[])

    useEffect(() => {
        if( !socket && rooms.length > 0 ){
            const socket = socketIOClient(
                endpoint
            )
            const roomIds = rooms.map(room => room.roomId)
            socket.on('connected', () => {
                socket.on('room-update' , data => {
                    onUpdateRoom(data);
                })
                socket.emit('join-leave-room', {
                    type : 'info',
                    roomIds ,
                    join : 'join'
                })
                setSocket(socket);
            })
        }
    },[rooms,endpoint,onUpdateRoom,user])

    const loading = props.loading ? <Loader /> : null;
    const error = props.error ? 
                  <Alert type='error' >
                      {props.error}
                  </Alert> : null

    const backButton = (
        <Button 
        onClick={
            () => {
                if( socket ){
                    socket.emit(
                        'socket-disconnect'
                    )
                }
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

    const onJoinRoom = () => {
        if( socket ){
            socket.emit('socket-disconnect')
        }
    }

    const roomsCard = (
        <Card style={{
            justifyContent : 'space-between'
        }}>
            <h3>Rooms</h3>
            <Rooms 
            rooms={props.rooms} 
            onJoinRoom={onJoinRoom}
            />
            {loading}
            {error}
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
        onUpdateRoom : (data) => dispatch(actions.updateRooms(data)),
        reset : () => dispatch(actions.resetRoom())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(FindRooms);